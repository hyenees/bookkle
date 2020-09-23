import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ModalLayout } from "widget/Modal";
import { CircleButton } from "widget/SmallButton";

interface SearchModalProps extends RouteComponentProps<any, any, any> {
  closeSearch: () => void;
}

const SearchModal: React.FunctionComponent<SearchModalProps> = (props) => {
  const [searchBook, setSearchBook] = useState<string>("");
  const { closeSearch } = props;

  const clickSearchBtn = () => {
    props.history.push(`/booklist/${searchBook}`, {
      searchBook: searchBook,
    });
    closeSearch();
  };

  return (
    <>
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                clickSearchBtn();
              }
            }}
          />
          <CircleButton mode="default" search onClick={clickSearchBtn}>
            <BsSearch size="20" />
          </CircleButton>
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
  padding: 30px 160px 30px 200px;
  background: #fff;
  animation: ${slideToBottom} 0.3s ease forwards;

  .close-icon {
    position: absolute;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    color: #d3492a;
    cursor: pointer;

    @media (max-width: 768px) {
      left: 2%;
    }
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    padding: 30px 80px 30px 100px;
  }

  @media (max-width: 768px) {
    padding: 15px 40px 15px 50px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 60px;
  border: none;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
