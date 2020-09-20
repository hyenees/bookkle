import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { clickHeartBtn } from "actions";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { ModalLayout, ModalBox } from "widget/Modal";
import Title from "widget/Title";
import Name from "widget/Name";
import { BookImg, BookImgBox } from "widget/BookImg";
import Grade from "widget/Grade";
import { CircleButton } from "widget/SmallButton";

interface ReviewDetailProps {
  closeDetail: () => void;
}

const ReviewDetail: React.FunctionComponent<ReviewDetailProps> = (props) => {
  const { reviewIds } = useSelector((state: RootState) => state.ReviewReducer);
  const { closeDetail } = props;
  const dispatch = useDispatch();
  const { reviewDetail } = useSelector(
    (state: RootState) => state.ReviewReducer
  );

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
    <ModalLayout onClick={closeDetail}>
      <ModalBox onClick={(e) => e.stopPropagation()} review>
        <CircleButton mode="default">
          <AiOutlineClose size="20" onClick={closeDetail} />
        </CircleButton>

        {reviewDetail && (
          <>
            <BookInfo>
              <BookImgBox review>
                <BookImg
                  src={reviewDetail.book_detail.image}
                  alt="book-cover"
                />
              </BookImgBox>
              <div className="book-title">
                <Title>{reviewDetail.book_detail.title}</Title>
                <Name>{reviewDetail.book_detail.author}</Name>
                <Grade>
                  <CgSmile
                    size="30"
                    className={reviewDetail.rating === 1 ? "select" : ""}
                  />
                  <CgSmileNone
                    size="30"
                    className={reviewDetail.rating === 2 ? "select" : ""}
                  />
                  <CgSmileSad
                    size="30"
                    className={reviewDetail.rating === 3 ? "select" : ""}
                  />
                </Grade>
              </div>
            </BookInfo>
            <ReviewContent>
              <Title review>{reviewDetail.title}</Title>
              <Name>{reviewDetail.user_info.nickname}</Name>
              <div className="contents">{reviewDetail.content}</div>
              <CircleButton
                mode="detail"
                onClick={(e) => recommendReview(e, reviewDetail.id)}
              >
                {reviewDetail.is_like ? (
                  reviewIds.includes(reviewDetail.id) ? (
                    <>
                      <HiHeart size="18" color="#d3492a" />
                      {reviewDetail.recommend_count}
                    </>
                  ) : (
                    <>
                      <HiOutlineHeart size="18" />
                      {reviewDetail.recommend_count - 1}
                    </>
                  )
                ) : reviewIds.includes(reviewDetail.id) ? (
                  <>
                    <HiHeart size="18" color="#d3492a" />
                    {reviewDetail.recommend_count + 1}
                  </>
                ) : (
                  <>
                    <HiOutlineHeart size="18" />
                    {reviewDetail.recommend_count}
                  </>
                )}
              </CircleButton>
            </ReviewContent>
            <Quote>{reviewDetail.quote}</Quote>
          </>
        )}
      </ModalBox>
    </ModalLayout>
  );
};

export default ReviewDetail;

const BookInfo = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px auto 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;

  .book-title {
    padding: 15px 0 0 15px;
    align-self: center;
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
