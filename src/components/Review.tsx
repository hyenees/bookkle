import React, { useState, useEffect } from "react";
import api from "api";
import styled from "styled-components";
import axios from "axios";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { clickHeartBtn } from "actions";
import { ReviewData } from "store/types";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { API_URL } from "config";
import Name from "widget/Name";
import ItemBox from "widget/ItemBox";
import Title from "widget/Title";
import Grade from "widget/Grade";
import { CircleButton, TextButton, Buttons } from "widget/SmallButton";

interface ReviewProps extends RouteComponentProps {
  openDetail?: (id: number) => void;
  myId?: string;
  deleteReview?: (id: number) => void;
}

const Review: React.FunctionComponent<ReviewProps> = (props) => {
  const { reviews, reviewIds } = useSelector(
    (state: RootState) => state.ReviewReducer
  );
  const dispatch = useDispatch();
  const { openDetail, myId, deleteReview } = props;

  const recommendReview = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.stopPropagation();
    if (localStorage.getItem("myId")) {
      dispatch(clickHeartBtn(id));
      const response = await api.likeReview(id);
      console.log(response);
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <>
      {console.log(reviewIds)}
      {reviews.map((review: ReviewData, idx: number) => (
        <ItemBox
          mode="review"
          key={idx}
          right={(idx + 1) % 4 === 0}
          onClick={() => openDetail && openDetail(review.id)}
        >
          <BookInfo>
            <img src={review.book_detail.image} alt="" />
            <div className="book-title">
              <Title>{review.book_detail.title}</Title>
              <Name book>{review.book_detail.author}</Name>
            </div>
          </BookInfo>
          <ReviewContent>
            <Title review>{review.title}</Title>
            <Name
              onClick={() => {
                myId === undefined &&
                  props.history.push(`/user/${review.user_info.id}`);
              }}
              underline={myId === undefined}
            >
              {review.user_info.nickname}
            </Name>
            <div className="contents">
              {review.content.length > 150
                ? `${review.content.slice(0, 150)}...`
                : review.content}
            </div>
          </ReviewContent>
          <Grade>
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
          <Buttons mode="text">
            <CircleButton
              mode="default"
              onClick={(e) => recommendReview(e, review.id)}
            >
              {review.is_like ? (
                reviewIds.includes(review.id) ? (
                  <>
                    <HiOutlineHeart size="18" />
                    {review.recommend_count - 1}
                  </>
                ) : (
                  <>
                    <HiHeart size="18" color="#d3492a" />
                    {review.recommend_count}
                  </>
                )
              ) : reviewIds.includes(review.id) ? (
                <>
                  <HiHeart size="18" color="#d3492a" />
                  {review.recommend_count + 1}
                </>
              ) : (
                <>
                  <HiOutlineHeart size="18" />
                  {review.recommend_count}
                </>
              )}
            </CircleButton>
            {localStorage.getItem("myId") === myId && (
              <Buttons mode="detail">
                <TextButton
                  onClick={() => props.history.push(`/posting/${review.id}`)}
                >
                  수정
                </TextButton>

                <TextButton
                  onClick={() => deleteReview && deleteReview(review.id)}
                >
                  삭제
                </TextButton>
              </Buttons>
            )}
          </Buttons>
        </ItemBox>
      ))}
    </>
  );
};

export default withRouter(Review);

const ReviewContent = styled.div`
  width: 100%;
  height: 278px;
  letter-spacing: 0.3px;
  text-align: center;

  .contents {
    margin-top: 18px;
    text-align: left;
    font-family: "IBMPlexSansKR-Light";
    white-space: pre-line;
  }
`;

const BookInfo = styled.div`
  display: flex;
  justify-content: space-around;

  img {
    display: block;
    position: relative;
    top: -25px;
    height: 130px;
    box-shadow: rgba(0, 0, 0, 0.25) 8px 8px 8px -2px;
  }
  .book-title {
    padding: 15px 0 0 15px;
    align-self: center;
  }
`;
