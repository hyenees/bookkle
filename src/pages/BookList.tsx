import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { BookState } from "redux/store/types";
import axios from "axios";
import Nav from "components/Nav";
import { fetchBookList } from "redux/actions";

interface BookListProps extends RouteComponentProps<any, any, BookListProps> {
  searchBook: string;
}

const BookList: React.FunctionComponent<BookListProps> = (props) => {
  const { books } = useSelector((state: RootState) => state.BookReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://dapi.kakao.com/v3/search/book?target=title", {
        params: { query: props.location.state.searchBook },
        headers: { Authorization: "KakaoAK e23535b3c49c44d77ffac09377ac9d58" },
      })
      .then((res) => {
        console.log(res.data.documents);
        dispatch(fetchBookList(res.data.documents));
      });
  }, [dispatch, props.location.state.searchBook]);

  return (
    <>
      {console.log(books)}
      <Nav />
      <div className="Main">bookkle</div>
    </>
  );
};

export default BookList;
