import React, { useEffect } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import axios from "axios";
import Nav from "components/Nav";
import { fetchBookList, selectBook } from "actions";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import Name from "widget/Name";
import ItemBox from "widget/ItemBox";
import Title from "widget/Title";
import TopTitle from "widget/TopTitle";
import logo from "images/logo.png";
import { BookImg, BookImgBox } from "widget/BookImg";

interface BookListProps extends RouteComponentProps<any, any, BookListProps> {
  searchBook: string;
}

const BookList: React.FunctionComponent<BookListProps> = (props) => {
  const { books } = useSelector((state: RootState) => state.BookReducer);
  const dispatch = useDispatch();

  const { searchBook } = props.location.state;

  useEffect(() => {
    axios
      .get("https://dapi.kakao.com/v3/search/book?target=title", {
        params: { query: searchBook, size: 50 },
        headers: { Authorization: "KakaoAK e23535b3c49c44d77ffac09377ac9d58" },
      })
      .then((res) => {
        dispatch(fetchBookList(res.data.documents));
      });
  }, [dispatch, searchBook]);

  return (
    <>
      <Nav />
      <Layout>
        <TopTitle mode="bookList">{searchBook}</TopTitle>
        <ListBoard>
          {books.map((book, idx: number) => (
            <ItemBox
              key={idx}
              mode="bookList"
              right={(idx + 1) % 4 === 0}
              onClick={() => {
                if (localStorage.getItem("token")) {
                  props.history.push(`/posting/${book.isbn}`);
                } else {
                  alert("로그인이 필요한 서비스입니다.");
                }
                dispatch(
                  selectBook(
                    book.title,
                    book.authors,
                    book.thumbnail,
                    book.isbn
                  )
                );
              }}
            >
              <BookImgBox bookList logo={book.thumbnail === ""}>
                <BookImg
                  logo={book.thumbnail === ""}
                  src={book.thumbnail === "" ? logo : book.thumbnail}
                  alt="book-cover"
                />
              </BookImgBox>
              <div className="book-info">
                <Title>{book.title}</Title>
                <Name>{book.authors.join(" · ")}</Name>
              </div>
            </ItemBox>
          ))}
        </ListBoard>
      </Layout>
    </>
  );
};

export default BookList;
