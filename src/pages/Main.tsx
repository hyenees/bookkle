import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Nav from "components/Nav";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";

interface ReviewInfo {
  book_title: string;
  author: string;
  nickname: string;
  title: string;
  grade: number;
  contents: string;
  image: string;
}

const Main: React.FunctionComponent = () => {
  const [data, setData] = useState<Array<ReviewInfo>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/reviews.json")
      .then((res) => setData(res.data.reviews));
  }, []);

  return (
    <>
      <Nav />
      <MainLayout>
        <BookSentence>
          <ImQuotesLeft size="30" />
          <div>생각을 기록하고 책으로 소통하는 공간, 북끌BooKkle</div>
          <ImQuotesRight size="30" />
        </BookSentence>
        <ReviewBoard>
          {data.map((review: ReviewInfo, idx: number) => (
            <ReviewBox key={idx} rightReview={(idx + 1) % 4 === 0}>
              <BookInfo>
                <img src={review.image} alt="" />
                <div className="book-title">
                  <Title book>{review.book_title}</Title>
                  <Name book>{review.author}</Name>
                </div>
              </BookInfo>
              <ReviewContent>
                <Title>{review.title}</Title>
                <Name>{review.nickname}</Name>
                <div className="contents">
                  {review.contents.slice(0, 150)}...
                </div>
              </ReviewContent>
              <Grade>
                <CgSmile
                  size="30"
                  className={review.grade === 1 ? "select" : ""}
                />
                <CgSmileNone
                  size="30"
                  className={review.grade === 2 ? "select" : ""}
                />
                <CgSmileSad
                  size="30"
                  className={review.grade === 3 ? "select" : ""}
                />
              </Grade>
              <div className="buttons">
                <CircleButton></CircleButton>
                <CircleButton></CircleButton>
              </div>
            </ReviewBox>
          ))}
        </ReviewBoard>
      </MainLayout>
    </>
  );
};

export default Main;

interface ReviewBoxStyle {
  rightReview?: boolean;
  book?: boolean;
}

const MainLayout = styled.main`
  padding-top: 120px;
`;

const BookSentence = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0;

  div {
    padding: 0 20px;
    /* font-family: "NanumMyeongjoBold"; */
    /* font-family: "NanumMyeongjo"; */
    font-family: "RIDIBatang";
    font-size: 36px;
  }
`;

const ReviewBoard = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 0 auto;
  padding: 70px 0 80px;
`;

const ReviewBox = styled.div<ReviewBoxStyle>`
  width: 23.5%;
  padding: 0 30px 10px;
  margin-bottom: 100px;
  margin-right: ${(props) => (props.rightReview ? 0 : "2%")};
  border-radius: 25px;
  background: #fcf1ef;

  .buttons {
    display: flex;
    margin: 30px 0 10px;
  }

  .select {
    color: #da2a00;
  }
`;

const Title = styled.h1<ReviewBoxStyle>`
  font-size: ${(props) => (props.book ? "18px" : "22px")};
  font-family: ${(props) => (props.book ? "" : "NanumMyeongjo")};
`;

const CircleButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 5px;
  background: white;
  border-radius: 50%;
`;

const Grade = styled.div`
  display: flex;
  padding-top: 15px;
`;

const ReviewContent = styled.div`
  width: 100%;
  height: 278px;
  letter-spacing: 0.3px;
  text-align: center;

  .contents {
    margin-top: 18px;
    font-family: "IBMPlexSansKR-Light";
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

const Name = styled.div<ReviewBoxStyle>`
  margin-top: 4px;
  color: #727272;
  font-size: ${(props) => props.book && "14px"};
`;
