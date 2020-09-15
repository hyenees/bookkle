import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { BsPersonPlusFill } from "react-icons/bs";
import { ReviewData } from "type";
import { ModalLayout, ModalBox } from "widget/Modal";
import Title from "widget/Title";
import Name from "widget/Name";
import { BookImg, BookImgBox } from "widget/BookImg";
import Grade from "widget/Grade";
import { CircleButton, Buttons } from "widget/SmallButton";

interface ReviewDetailProps {
  closeDetail: () => void;
  reviewDetail: ReviewData | null;
}

const ReviewDetail: React.FunctionComponent<ReviewDetailProps> = (props) => {
  const { reviewDetail, closeDetail } = props;
  return (
    <ModalLayout onClick={closeDetail}>
      {console.log(reviewDetail)}
      <ModalBox onClick={(e) => e.stopPropagation()} review>
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
              <Buttons mode="detail">
                <CircleButton mode="detail">
                  {/* <HiHeart size="18" /> */}
                  <HiOutlineHeart size="18" />
                </CircleButton>
                <CircleButton mode="detail">
                  <BsPersonPlusFill size="18" />
                  {/* <BsPersonPlus/> */}
                </CircleButton>
              </Buttons>
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
  margin: 30px auto 40px;
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
