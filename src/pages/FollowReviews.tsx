import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import api from "api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { clickHeartBtn, getLikeCount, countLike } from "actions";
import Nav from "components/Nav";
import { ReviewData } from "store/types";
import { getFollowReviews } from "actions";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import TopTitle from "widget/TopTitle";
import Title from "widget/Title";
import Name from "widget/Name";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import { CircleButton } from "widget/SmallButton";
import { BookImg, BookImgBox } from "widget/BookImg";
import Grade from "widget/Grade";

const FollowReviews: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { reviewIds, followReviews, countHeart } = useSelector(
    (state: RootState) => state.ReviewReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clickHeartBtn(0));
    followReviews.forEach((review) => {
      console.log("a");
      if (review.is_like) {
        return dispatch(clickHeartBtn(review.id));
      }
      dispatch(getLikeCount(review.id, review.recommend_count));
    });
  }, [followReviews]);

  useEffect(() => {
    (async () => {
      const res = await api.getFollowReviews();
      dispatch(getFollowReviews(res));
      console.log("folo", res);
    })();
  }, [dispatch]);

  const recommendReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    const response = await api.likeReview(id);
    dispatch(countLike(id));
    dispatch(clickHeartBtn(id));

    console.log(response);
  };

  return (
    <>
      <Nav />
      <Layout>
        <TopTitle mode="mypage">Follow</TopTitle>
        {followReviews.length > 0 ? (
          <ListBoard following>
            {followReviews.map((review: ReviewData, idx: number) => (
              <Following key={idx}>
                <div className="user">
                  <Nickname
                    onClick={() =>
                      props.history.push(`user/${review.user_info.id}`)
                    }
                  >
                    {review.user_info.nickname}
                  </Nickname>
                  <CircleButton
                    mode="detail"
                    onClick={(e) => recommendReview(e, review.id)}
                  >
                    {reviewIds.includes(review.id) ? (
                      <HiHeart size="18" color="#d3492a" />
                    ) : (
                      <HiOutlineHeart size="18" />
                    )}
                    {countHeart && countHeart[review.id]}
                  </CircleButton>
                </div>
                <div className="review-contents">
                  <BookInfo>
                    <BookImgBox bookList>
                      <BookImg
                        src={review.book_detail.image}
                        alt="book-cover"
                      />
                    </BookImgBox>
                    <div className="book-info">
                      <Title follow>{review.book_detail.title}</Title>
                      <Name follow>{review.book_detail.author}</Name>
                      <Grade follow>
                        <CgSmile
                          size="30"
                          className={review.rating === 1 ? "select" : ""}
                        />
                        <CgSmileNone
                          size="30"
                          className={review.rating === 2 ? "select" : ""}
                        />
                        <CgSmileSad
                          size="30"
                          className={review.rating === 3 ? "select" : ""}
                        />
                      </Grade>
                    </div>
                  </BookInfo>
                  <ReviewContent>
                    <Title review>{review.title}</Title>
                    <Contents>{review.content}</Contents>
                    <Quote>{review.quote}</Quote>
                  </ReviewContent>
                </div>
              </Following>
            ))}
          </ListBoard>
        ) : (
          <EmptyMsg>
            <TopTitle mode="main">팔로우한 유저가 없습니다.</TopTitle>
          </EmptyMsg>
        )}
      </Layout>
    </>
  );
};

export default FollowReviews;

const BookInfo = styled.div`
  flex: 1;
  margin-right: 40px;
  align-self: center;

  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 20px;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Following = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 50px 24px;
  border-bottom: 1px solid #ddd;

  .review-contents {
    display: flex;
    flex: 14;

    @media (max-width: 768px) {
      display: block;
      flex: 11;
    }
  }

  .user {
    flex: 1;
    padding-bottom: 10px;
  }
`;

const ReviewContent = styled.div`
  flex: 5;
  align-self: center;
  letter-spacing: 0.3px;
  text-align: center;
`;

const Contents = styled.div`
  height: auto;
  margin-top: 18px;
  text-align: justify;
  font-family: "IBMPlexSansKR-Light";
  white-space: pre-line;
`;

const Nickname = styled.h1`
  font-family: "IBMPlexSansKR-Text";
  font-size: 22px;
  &:hover {
    color: #d3492a;
    cursor: pointer;
  }
`;

const Quote = styled.blockquote`
  position: relative;
  margin-top: 20px;
  padding: 20px;
  font-size: 16px;
  font-family: "RIDIBatang";
  word-break: keep-all;
  text-align: center;
  background: #f4f4f4;
  border-radius: 5px;
`;

const EmptyMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68vh;
  color: #4a4a4a;
`;
