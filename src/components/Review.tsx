import React from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { BsPersonPlusFill } from "react-icons/bs";
import { ReviewData } from "type";
import Name from "widget/Name";
import ItemBox from "widget/ItemBox";
import Title from "widget/Title";
import Grade from "widget/Grade";
import { CircleButton, TextButton, Buttons } from "widget/SmallButton";
import axios from "axios";
import { API_URL } from "config";

interface ReviewProps extends RouteComponentProps {
  review: ReviewData;
  idx: number;
  openDetail?: (id: number) => void;
  mypage?: boolean;
  deleteReview?: (id: number) => void;
}

const recommendReview = (id: number) => {
  axios
    .post(
      `${API_URL}/reviews/like`,
      { review: id },
      { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
    )
    .then((res) => console.log(res));
};

const Review: React.FunctionComponent<ReviewProps> = (props) => {
  const { review, idx, openDetail, mypage, deleteReview } = props;
  return (
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
        <Name>{review.user_info.nickname}</Name>
        <div className="contents">
          {review.content.length > 150
            ? `${review.content.slice(0, 150)}...`
            : review.content}
        </div>
      </ReviewContent>
      <Grade>
        <CgSmile size="30" className={review.rating === 1 ? "select" : ""} />
        <CgSmileNone
          size="30"
          className={review.rating === 2 ? "select" : ""}
        />
        <CgSmileSad size="30" className={review.rating === 3 ? "select" : ""} />
      </Grade>
      <Buttons mode="text">
        <Buttons mode="default">
          <CircleButton mode="default">
            {/* <HiHeart size="18" /> */}
            {review.recommend_count}
            <HiOutlineHeart
              size="18"
              onClick={() => recommendReview(review.id)}
            />
          </CircleButton>
          <CircleButton mode="default">
            <BsPersonPlusFill size="18" />
            {/* <BsPersonPlus/> */}
          </CircleButton>
        </Buttons>
        {mypage && (
          <Buttons mode="default">
            <TextButton
              onClick={() => props.history.push(`/posting/${review.id}`)}
            >
              수정
            </TextButton>
            <TextButton onClick={() => deleteReview && deleteReview(review.id)}>
              삭제
            </TextButton>
          </Buttons>
        )}
      </Buttons>
    </ItemBox>
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
    top: -30px;
    height: 130px;
    box-shadow: rgba(0, 0, 0, 0.25) 8px 8px 8px -2px;
  }
  .book-title {
    padding: 15px 0 0 15px;
    align-self: center;
  }
`;
