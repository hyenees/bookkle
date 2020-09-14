import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ModalLayout } from "widget/Modal";

interface SearchModalProps extends RouteComponentProps<any, any, any> {
  closeSearch: () => void;
}

const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
  const [searchBook, setSearchBook] = useState<string>("");

  const { closeSearch } = props;
  return (
    <>
      {console.log(searchBook)}
      <ModalLayout onClick={closeSearch}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <AiOutlineCloseCircle
            onClick={closeSearch}
            size="26"
            className="close-icon"
          />
          <SearchInput
            placeholder="리뷰하고 싶은 책 제목을 입력하세요."
            onChange={(e) => setSearchBook(e.target.value)}
          />
          <BsSearch
            className="search-icon"
            size="20"
            onClick={() => {
              props.history.push(`/booklist/${searchBook}`, {
                searchBook: searchBook,
              });
              closeSearch();
            }}
          />
        </ModalBox>
      </ModalLayout>
    </>
  );
};

export default withRouter(SearchModal);

const slideToBottom = keyframes`
   0%{
        transform : translateY(-100%)
    }
    100%{
        transform : translateY(0)
    }
`;

const ModalBox = styled.div`
  position: fixed;
  width: 100%;
  padding: 30px 80px 30px 160px;
  background: #fff;
  animation: ${slideToBottom} 0.3s ease forwards;

  .search-icon {
    position: absolute;
    top: 50%;
    right: 90px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .close-icon {
    position: absolute;
    top: 50%;
    left: 90px;
    transform: translateY(-50%);
    color: #d3492a;
    cursor: pointer;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  font-size: 24px;
`;
