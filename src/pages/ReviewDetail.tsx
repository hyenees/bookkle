import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import { HiHeart } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { BsPersonPlusFill } from "react-icons/bs";
import { BookDetail, Nickname } from "./Main";
import { ModalLayout, ModalBox } from "widget/Modal";
import Title from "widget/Title";
import Name from "widget/Name";
import { BookImg, BookImgBox } from "widget/BookImg";
import Grade from "widget/Grade";
import { CircleButton, Buttons } from "widget/SmallButton";

interface ReviewDetailProps {
  closeDetail: () => void;
}

interface ReviewData {
  id: number;
  book_detail: BookDetail;
  user_info: Nickname;
  title: string;
  book: number;
  user: number;
  quote: string;
  recommend_count: number;
  rating: number;
  content: string;
}

const ReviewDetail: React.FunctionComponent<ReviewDetailProps> = (props) => {
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/reviewDetail.json")
      .then((res: any) => {
        console.log(res);
        setReviewData(res.data.detail);
      });
  }, []);

  return (
    <ModalLayout onClick={props.closeDetail}>
      {console.log(reviewData)}
      <ModalBox onClick={(e) => e.stopPropagation()} review>
        {reviewData && (
          <>
            <BookInfo>
              <BookImgBox review>
                <BookImg src={reviewData.book_detail.image} alt="book-cover" />
              </BookImgBox>
              <div className="book-title">
                <Title>{reviewData.book_detail.title}</Title>
                <Name>{reviewData.book_detail.author}</Name>
                <Grade>
                  <CgSmile
                    size="30"
                    className={reviewData.rating === 1 ? "select" : ""}
                  />
                  <CgSmileNone
                    size="30"
                    className={reviewData.rating === 2 ? "select" : ""}
                  />
                  <CgSmileSad
                    size="30"
                    className={reviewData.rating === 3 ? "select" : ""}
                  />
                </Grade>
              </div>
            </BookInfo>
            <ReviewContent>
              <Title review>{reviewData.title}</Title>
              <Name>{reviewData.user_info.nickname}</Name>
              <div className="contents">{reviewData.content}</div>
              <Buttons mode="detail">
                <CircleButton mode="detail">
                  <HiHeart size="18" />
                  {/* <HiOutlineHeart/> */}
                </CircleButton>
                <CircleButton mode="detail">
                  <BsPersonPlusFill size="18" />
                  {/* <BsPersonPlus/> */}
                </CircleButton>
              </Buttons>
            </ReviewContent>
            <Quote>{reviewData.quote}</Quote>
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
