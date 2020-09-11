import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Nav from "components/Nav";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import Name from "widget/Name";
import ItemBox from "widget/ItemBox";
import Title from "widget/Title";
import TopTitle from "widget/TopTitle";

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
      <Layout>
        <BookSentence>
          <ImQuotesLeft size="30" />
          <TopTitle>생각을 기록하고 책으로 소통하는 공간, 북끌BooKkle</TopTitle>
          <ImQuotesRight size="30" />
        </BookSentence>
        <ListBoard>
          {data.map((review: ReviewInfo, idx: number) => (
            <ItemBox mode="review" key={idx} right={(idx + 1) % 4 === 0}>
              <BookInfo>
                <img src={review.image} alt="" />
                <div className="book-title">
                  <Title>{review.book_title}</Title>
                  <Name book>{review.author}</Name>
                </div>
              </BookInfo>
              <ReviewContent>
                <Title review>{review.title}</Title>
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
            </ItemBox>
          ))}
        </ListBoard>
      </Layout>
    </>
  );
};

export default Main;

const BookSentence = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px 0;
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
