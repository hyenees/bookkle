import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import Nav from "components/Nav";
import Layout from "widget/Layout";
import TopTitle from "widget/TopTitle";
import Title from "widget/Title";
import Input from "widget/Input";
import { BookImg, BookImgBox } from "widget/BookImg";
import Name from "widget/Name";

const Post: React.FunctionComponent<RouteComponentProps> = (props) => {
  const { selectedBook } = useSelector((state: RootState) => state.BookReducer);
  return (
    <>
      {console.log(selectedBook)}
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
              <Input />
            </InputBox>
            <InputBox>
              <Label>감상평</Label>
              <TextArea></TextArea>
            </InputBox>
            <Label>평가</Label>
            <InputBox>
              <Label>좋았던 글귀</Label>
              <Input />
            </InputBox>
          </PostBox>
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
  padding-top: 40px;
  border-top: 1px solid;
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
