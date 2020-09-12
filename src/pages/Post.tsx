import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import Nav from "components/Nav";
import { API_URL } from "config";
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

interface Review {
  title: string;
  content: string;
  quote: string | null;
  rating: number | null;
}

const Post: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { selectedBook } = useSelector((state: RootState) => state.BookReducer);
  const [review, setReview] = useState<Review>({
    title: "",
    content: "",
    quote: null,
    rating: null,
  });

  const postReview = () => {
    axios
      .post(
        `${API_URL}/reviews`,
        {
          title: review.title,
          content: review.content,
          quote: review.quote,
          rating: review.rating,
          book_title: selectedBook?.title,
          book_author: selectedBook?.authors.join(" · "),
          book_image: selectedBook?.thumbnail,
        },
        { headers: { Authorization: `Token ${localStorage.getItem("token")}` } }
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      {console.log(review.quote)}
      <Nav />
      <Layout>
        <PostBoard>
          <TopTitle>리뷰를 남겨주세요.</TopTitle>

          {selectedBook !== null && (
            <BookInfo>
              <BookImgBox>
                <BookImg src={selectedBook?.thumbnail} alt="book-cover" />
              </BookImgBox>
              <div className="book-title">
                <Title>{selectedBook.title}</Title>
                <Name>{selectedBook.authors.join(" · ")}</Name>
              </div>
            </BookInfo>
          )}
          <PostBox>
            <InputBox>
              <Label>제목</Label>
              <Input
                onChange={(e) =>
                  setReview({ ...review, title: e.target.value })
                }
              />
            </InputBox>
            <InputBox>
              <Label>감상평</Label>
              <TextArea
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
                onChange={(e) =>
                  setReview({ ...review, quote: e.target.value })
                }
              />
            </InputBox>
          </PostBox>
          <Button posting onClick={postReview}>
            등록하기
          </Button>
        </PostBoard>
      </Layout>
    </>
  );
};

export default Post;

const PostBoard = styled.section`
  width: 50%;
  margin: 0 auto;
`;

const PostBox = styled.div`
  width: 100%;
  padding: 40px 0 40px;
  border-top: 1px solid;
  border-bottom: 1px solid;
`;

const BookInfo = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin: 60px auto 30px;
  .book-title {
    padding: 15px 0 0 15px;
    align-self: center;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 220px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  padding: 11px;
  border: 1px solid #f4f4f4;
`;
