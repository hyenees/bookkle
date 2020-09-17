import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { API_URL } from "config";
import Nav from "components/Nav";
import { ReviewData } from "store/types";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import Title from "widget/Title";
import Name from "widget/Name";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import { CircleButton } from "widget/SmallButton";
import { BookImg, BookImgBox } from "widget/BookImg";
import Grade from "widget/Grade";

const FollowReviews: React.FunctionComponent = (props) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const { reviewIds } = useSelector((state: RootState) => state.ReviewReducer);

  useEffect(() => {
    const getFollowReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews/following`, {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        });
        console.log(response);
        setReviews(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowReviews();
  }, []);

  return (
    <>
      <Nav />
      <Layout>
        <ListBoard following>
          {reviews.map((review: ReviewData) => (
            <Following>
              <div className="user">
                <Nickname>{review.user_info.nickname}</Nickname>
                <CircleButton
                  mode="detail"
                  // onClick={(e) => recommendReview(e, reviewDetail.id)}
                >
                  {reviewIds.includes(review.id) ? (
                    <>
                      <HiHeart size="18" />
                      {review.recommend_count + 1}
                    </>
                  ) : (
                    <>
                      <HiOutlineHeart size="18" />
                      {review.recommend_count}
                    </>
                  )}
                </CircleButton>
              </div>
              <BookInfo>
                <BookImgBox bookList>
                  <BookImg src={review.book_detail.image} alt="book-cover" />
                </BookImgBox>
                <div className="book-info">
                  <Title>{review.book_detail.title}</Title>
                  <Name>{review.book_detail.author}</Name>
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
                <div className="contents">{review.content}</div>
                <Quote>{review.quote}</Quote>
              </ReviewContent>
            </Following>
          ))}
        </ListBoard>
      </Layout>
    </>
  );
};

export default FollowReviews;

const BookInfo = styled.div`
  margin-right: 40px;
  align-self: center;
  .book-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Following = styled.div`
  display: flex;
  padding: 50px 24px;
  border-bottom: 1px solid #ddd;

  .user {
    width: 120px;
  }
`;

const ReviewContent = styled.div`
  width: 100%;
  letter-spacing: 0.3px;
  text-align: center;

  .contents {
    margin-top: 18px;
    text-align: left;
    font-family: "IBMPlexSansKR-Light";
    white-space: pre-line;
  }
`;

const Nickname = styled.h1`
  font-family: "IBMPlexSansKR-Text";
  font-size: 22px;
`;

const Quote = styled.blockquote`
  position: relative;
  margin-top: 20px;
  padding: 20px;
  /* quotes: "“" "”" "‘" "’"; */
  font-size: 16px;
  font-family: "RIDIBatang";
  word-break: keep-all;
  text-align: center;
  background: #f4f4f4;
  border-radius: 5px;

  &::before {
    content: open-quote;
    position: absolute;
    top: 6%;
    left: 0;
    font-size: 2em;
  }

  &::after {
    content: close-quote;
    position: absolute;
    top: 6%;
    right: 0;

    font-size: 2em;
  }
`;
