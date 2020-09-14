import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Nav from "components/Nav";
import Review from "components/Review";
import ReviewDetail from "./ReviewDetail";
import { API_URL } from "config";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";

export interface BookDetail {
  title: string;
  author: string;
  image: string;
}

export interface Nickname {
  nickname: string;
}

export interface ReviewInfo {
  book_detail: BookDetail;
  user_info: Nickname;
  title: string;
  rating: number;
  content: string;
  id: number;
  recommend_count: never;
}

interface QuoteInfo {
  book_title: string;
  book_author: string;
  quote: string;
}

const Main: React.FunctionComponent = () => {
  const [data, setData] = useState<Array<ReviewInfo>>([]);
  const [randomQuote, setRandomQuote] = useState<QuoteInfo | null>(null);
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

  useEffect(() => {
    // axios.get(`${API_URL}/reviews/quote`).then((res) => {
    //   console.log(res);
    //   setRandomQuote(res.data);
    // });
    axios
      .get("http://localhost:3000/data/reviews.json")
      // .get(`${API_URL}/reviews`)
      .then((res) => {
        console.log(res);
        setData(res.data.results);
      });
  }, []);

  const closeDetail = () => {
    setIsReviewOpened(false);
  };

  return (
    <>
      <Nav />
      <Layout>
        <TopTitle mode="main">
          생각을 기록하고 책으로 소통하는 공간, &nbsp;<span>북끌BooKkle</span>
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
            <Review
              review={review}
              idx={idx}
              openDetail={() => setIsReviewOpened(true)}
            />
          ))}
        </ListBoard>
      </Layout>
      {isReviewOpened && <ReviewDetail closeDetail={closeDetail} />}
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
