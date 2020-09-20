import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import api from "api";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import Nav from "components/Nav";
import { BookDetail } from "store/types";
import { CgSmile } from "react-icons/cg";
import { CgSmileSad } from "react-icons/cg";
import { CgSmileNone } from "react-icons/cg";
import Layout from "widget/Layout";
import TopTitle from "widget/TopTitle";
import Title from "widget/Title";
import Input from "widget/Input";
import { BookImg, BookImgBox } from "widget/BookImg";
import Name from "widget/Name";
import Grade from "widget/Grade";
import Button from "widget/Button";

interface PostingProps {
  id?: string | undefined;
}

export interface InputReview {
  book_detail: BookDetail | null;
  title: string;
  content: string;
  quote: string | null;
  rating: number | null;
}

const Posting: React.FunctionComponent<RouteComponentProps<PostingProps>> = (
  props
) => {
  const { selectedBook } = useSelector((state: RootState) => state.BookReducer);
  const [review, setReview] = useState<InputReview>({
    book_detail: null,
    title: "",
    content: "",
    quote: null,
    rating: null,
  });
  const [revise, setRevise] = useState<boolean>(false);

  useEffect(() => {
    if (props.match.params.id !== undefined) {
      (async () => {
        const res = await api.getInputReview(props.match.params.id);
        console.log(res);
        setRevise(true);
        setReview(res);
      })();
    }
  }, [props.match.params.id]);

  const postReview = async () => {
    const res = await api.postReview(
      review.title,
      review.content,
      review.quote,
      review.rating,
      selectedBook?.title,
      selectedBook?.authors.join(" · "),
      selectedBook?.thumbnail
    );
    console.log(res);
    props.history.push(`/user/${localStorage.getItem("myId")}`);
  };

  const updateReview = async () => {
    const res = await api.updateReview(
      props.match.params.id,
      review.title,
      review.content,
      review.quote,
      review.rating
    );
    console.log(res);
    props.history.push(`/user/${localStorage.getItem("myId")}`);
  };

  return (
    <>
      {console.log(props)}
      <Nav />
      <Layout>
        <PostBoard>
          <TopTitle mode="post">리뷰를 남겨주세요.</TopTitle>
          {!props.match.params.id && selectedBook !== null ? (
            <BookInfo>
              <BookImgBox>
                <BookImg src={selectedBook?.thumbnail} alt="book-cover" />
              </BookImgBox>
              <div className="book-title">
                <Title posting>{selectedBook?.title}</Title>
                <Name posting>{selectedBook.authors.join(" · ")}</Name>
              </div>
            </BookInfo>
          ) : (
            <BookInfo>
              <BookImgBox>
                <BookImg src={review.book_detail?.image} alt="book-cover" />
              </BookImgBox>
              <div className="book-title">
                <Title posting>{review.book_detail?.title}</Title>
                <Name posting>{review.book_detail?.author}</Name>
              </div>
            </BookInfo>
          )}
          <PostBox>
            <InputBox>
              <Label>제목</Label>
              <Input
                value={review.title}
                onChange={(e) =>
                  setReview({ ...review, title: e.target.value })
                }
              />
            </InputBox>
            <InputBox>
              <Label>감상평</Label>
              <TextArea
                placeholder="500자 이내로 작성하세요."
                value={review.content}
                onChange={(e) =>
                  setReview({ ...review, content: e.target.value })
                }
              />
            </InputBox>
            <InputBox>
              <Label>평가</Label>
              <Grade>
                <CgSmile
                  size="30"
                  className={`posting ${review.rating === 1 ? "rating" : ""}`}
                  onClick={() => setReview({ ...review, rating: 1 })}
                />
                <CgSmileNone
                  size="30"
                  className={`posting ${review.rating === 2 ? "rating" : ""}`}
                  onClick={() => setReview({ ...review, rating: 2 })}
                />
                <CgSmileSad
                  size="30"
                  className={`posting ${review.rating === 3 ? "rating" : ""}`}
                  onClick={() => setReview({ ...review, rating: 3 })}
                />
              </Grade>
            </InputBox>
            <InputBox>
              <Label>좋았던 문구</Label>
              <Input
                value={review.quote === null ? "" : review.quote}
                type="text"
                maxLength={78}
                onChange={(e) =>
                  setReview({ ...review, quote: e.target.value })
                }
              />
            </InputBox>
          </PostBox>
          <Button posting onClick={revise ? updateReview : postReview}>
            등록하기
          </Button>
        </PostBoard>
      </Layout>
    </>
  );
};

export default Posting;

const PostBoard = styled.section`
  width: 50%;
  margin: 0 auto;

  @media (max-width: 1200px) {
    width: 70%;
  }
`;

const PostBox = styled.div`
  width: 100%;
  padding: 40px 0 40px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

const BookInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin: 30px auto 40px;

  .book-title {
    padding: 15px 0 0 15px;
    align-self: center;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    display: block;
    width: 80%;
    margin: 10px auto 20px;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 18%;
  font-size: 18px;
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 20%;
  }
  @media (max-width: 768px) {
    width: 35%;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  padding: 11px;
  border: 1px solid #f4f4f4;
  color: #727272;
`;
