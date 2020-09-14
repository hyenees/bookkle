import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Nav from "components/Nav";
import { API_URL } from "config";
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
import Grade from "widget/Grade";

interface BookDetail {
  title: string;
  author: string;
  image: string;
}

interface NickName {
  nickname: string;
}

interface ReviewInfo {
  book_detail: BookDetail;
  user_info: NickName;
  title: string;
  rating: number;
  content: string;
  id: number;
}

interface QuoteInfo {
  book_title: string;
  book_author: string;
  quote: string;
}

const Main: React.FunctionComponent = () => {
  const [data, setData] = useState<Array<ReviewInfo>>([]);
  const [randomQuote, setRandomQuote] = useState<QuoteInfo | null>(null);

  useEffect(() => {
    axios.get(`${API_URL}/reviews/quote`).then((res) => {
      console.log(res);
      setRandomQuote(res.data);
    });
    axios
      // .get("http://localhost:3000/data/reviews.json")
      .get(`${API_URL}/reviews`)
      .then((res) => {
        console.log(res);
        setData(res.data.results);
      });
  }, []);

  return (
    <>
      <Nav />
      <Layout>
        <TopTitle mode="main">
          생각을 기록하고 책으로 소통하는 공간, <span>북끌BooKkle</span>
        </TopTitle>
        <SentenceBox>
          <QuoteIcon>
            <ImQuotesLeft size="26" />
            <div className="top-quote"></div>
          </QuoteIcon>
          <TopTitle mode="quote">{randomQuote && randomQuote.quote}</TopTitle>
          {/* <TopTitle mode="quote">
            언제 어디서나 추함은 아름다운면을 지니고 있다. 아무도 그것을
            알아채지 못한 곳에서 그것들을 발견하는 것은 매우 짜릿하다.
          </TopTitle> */}
          <div className="quote-info">
            {randomQuote && randomQuote.book_author}&nbsp; &lt;
            {randomQuote && randomQuote.book_title}&gt;
          </div>
          <QuoteIcon right>
            <div className="bottom-quote"></div>
            <ImQuotesRight size="26" />
          </QuoteIcon>
        </SentenceBox>

        <ListBoard>
          {data.map((review: ReviewInfo, idx: number) => (
            <ItemBox mode="review" key={idx} right={(idx + 1) % 4 === 0}>
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
                  {review.content.slice(0, 150)}...
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

interface QuoteStyle {
  right?: boolean;
}

const SentenceBox = styled.div`
  width: 60%;
  margin: 30px auto;

  .quote-info {
    text-align: center;
    padding-bottom: 20px;
  }
`;

const QuoteIcon = styled.div<QuoteStyle>`
  display: flex;
  justify-content: ${(props) => props.right && "flex-end"};

  .top-quote {
    width: 95%;
    margin-left: 20px;
    border-bottom: 2px solid #ddd;
  }

  .bottom-quote {
    width: 95%;
    margin-right: 20px;
    border-top: 2px solid #ddd;
  }
`;

const CircleButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 5px;
  background: white;
  border-radius: 50%;
`;

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
