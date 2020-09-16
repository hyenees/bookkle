import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getReviewList } from "redux/actions";
import Nav from "components/Nav";
import Review from "components/Review";
import ReviewDetail from "./ReviewDetail";
import { ReviewData } from "redux/store/types";
import { QuoteInfo } from "type";
import { API_URL } from "config";
import { ImQuotesLeft } from "react-icons/im";
import { ImQuotesRight } from "react-icons/im";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";
import Button from "widget/Button";

const LIMIT = 8;

const Main: React.FunctionComponent = () => {
  const [reviewDetail, setReviewDetail] = useState<ReviewData | null>(null);
  const [randomQuote, setRandomQuote] = useState<QuoteInfo | null>(null);
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${API_URL}/reviews/quote`).then((res) => {
      console.log(res);
      setRandomQuote(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/reviews.json")
      // .get(`${API_URL}/reviews)
      .then((res) => {
        console.log(res);
        dispatch(getReviewList(res.data.results));
      });
  }, [dispatch]);

  const viewMoreReviews = () => {
    axios
      .get(`${API_URL}/reviews/?limit=${LIMIT}&offset=${offset}`)
      .then((res) => {
        console.log(res);
        dispatch(getReviewList(res.data.results));
      });
    setOffset(offset + LIMIT);
  };

  const closeDetail = () => {
    setIsReviewOpened(false);
  };

  const openDetail = (id: number) => {
    setIsReviewOpened(true);
    axios
      // .get(`${API_URL}/reviews/${id}`)
      .get("http://localhost:3000/data/reviewDetail.json")
      .then((res) => {
        console.log(res);
        // setReviewDetail(res.data);
        setReviewDetail(res.data.detail);
      });
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
          {/* <TopTitle mode="quote">{randomQuote && randomQuote.quote}</TopTitle> */}
          <TopTitle mode="quote">
            언제 어디서나 추함은 아름다운면을 지니고 있다. 아무도 그것을
            알아채지 못한 곳에서 그것들을 발견하는 것은 매우 짜릿하다.
          </TopTitle>
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
          <Button onClick={viewMoreReviews}>더 보기</Button>
        </ListBoard>
      </Layout>
      {isReviewOpened && (
        <ReviewDetail closeDetail={closeDetail} reviewDetail={reviewDetail} />
      )}
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
