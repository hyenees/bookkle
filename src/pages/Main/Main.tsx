import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import api from "api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import {
  getReviewList,
  getReview,
  addReviewList,
  clickHeartBtn,
} from "actions";
import Nav from "components/Nav";
import Review from "components/Review";
import ReviewDetail from "./ReviewDetail";
import { API_URL } from "config";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";
import Button from "widget/Button";

export interface QuoteInfo {
  book_title: string;
  book_author: string;
  quote: string;
}

const LIMIT = 8;

const Main: React.FunctionComponent = () => {
  const [randomQuote, setRandomQuote] = useState<QuoteInfo | null>(null);
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(8);
  const dispatch = useDispatch();
  const { reviews, reviewIds } = useSelector(
    (state: RootState) => state.ReviewReducer
  );

  useEffect(() => {
    axios
      .get(`${API_URL}/reviews/quote`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setRandomQuote(res.data);
      });
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await api.getReviews();
      dispatch(getReviewList(res));
      console.log(res);
    };
    fetchReviews();
  }, [dispatch]);

  const viewMoreReviews = async (offset: number) => {
    const res = await api.addReviews(offset);
    dispatch(addReviewList(res));
    console.log(res);
    setOffset(offset + LIMIT);
  };

  const closeDetail = () => {
    setIsReviewOpened(false);
  };

  const openDetail = async (id: number) => {
    const res = await api.getReviewDetail(id);
    dispatch(getReview(res));
    console.log(res);
    setIsReviewOpened(true);
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
          <Review openDetail={openDetail} />
        </ListBoard>
        <Button posting onClick={() => viewMoreReviews(offset)}>
          더 보기
        </Button>
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

  @media (max-width: 768px) {
    width: 80%;
    margin: 10px auto;
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