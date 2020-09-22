import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import api from "api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { clickHeartBtn, getLikeCount, countLike } from "actions";
import { ReviewData } from "store/types";
import { getFollowReviews } from "actions";
import Nav from "components/Nav";
import Loading from "components/Loading";
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
import { ReviewContent, Contents } from "widget/ReviewContent";
import Quote from "widget/Quote";
import EmptyMsg from "widget/EmptyMsg";

const FollowReviews: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { reviewIds, followReviews, countHeart } = useSelector(
    (state: RootState) => state.ReviewReducer
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(clickHeartBtn(0));
    followReviews.forEach((review) => {
      if (review.is_like) {
        return dispatch(clickHeartBtn(review.id));
      }
      dispatch(getLikeCount(review.id, review.recommend_count));
    });
  }, [followReviews, dispatch]);

  useEffect(() => {
    (async () => {
      const res = await api.getFollowReviews();
      dispatch(getFollowReviews(res));
      setIsLoading(false);
    })();
  }, [dispatch]);

  const recommendReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    await api.likeReview(id);
    dispatch(countLike(id));
    dispatch(clickHeartBtn(id));
  };

  return (
    <>
      <Nav />
      {isLoading ? (
        <Loading />
      ) : (
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
                    <ReviewContent follow>
                      <Title review>{review.title}</Title>
                      <Contents follow>{review.content}</Contents>
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
      )}
    </>
  );
};

export default FollowReviews;

const Following = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 50px 24px;
  border-bottom: 1px solid #ddd;

  .user {
    flex: 1;
    padding-bottom: 10px;
  }

  .review-contents {
    display: flex;
    flex: 14;

    @media (max-width: 768px) {
      display: block;
      flex: 11;
    }
  }
`;

const BookInfo = styled.div`
  flex: 1;
  margin-right: 40px;
  align-self: center;

  .book-info {
    padding-bottom: 20px;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const Nickname = styled.h1`
  font-family: "IBMPlexSansKR-Text";
  font-size: 22px;

  &:hover {
    color: #d3492a;
    cursor: pointer;
  }
`;
