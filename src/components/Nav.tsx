import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AccountModal from "pages/Main/Account/AccountModal";
import SearchModal from "components/SearchModal";
import logo from "images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { Buttons } from "widget/SmallButton";

const Nav: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [isOpenAccount, setIsOpenAccount] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const closeSearch = () => {
    setIsOpenSearch(false);
  };

  const closeAccount = () => {
    setIsOpenAccount(false);
  };

  const logout = async () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const goToFollowReviews = () => {
    if (localStorage.getItem("myId")) {
      props.history.push("/following");
      window.scrollTo(0, 0);
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  };

  return (
    <>
      <NavLayout>
        <NavBox>
          <img
            src={logo}
            alt="bookkle"
            onClick={() => props.history.push("/")}
          />
          <Buttons mode="nav">
            <Icon onClick={() => setIsOpenSearch(true)}>
              <BiBookAdd className="post" size="26" />
            </Icon>
            <Icon onClick={goToFollowReviews}>
              <div>Follow</div>
            </Icon>
            <Icon>
              {localStorage.getItem("myId") ? (
                <div
                  onClick={() => {
                    props.history.push(`/user/${localStorage.getItem("myId")}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  My
                </div>
              ) : (
                <MdAccountCircle
                  className="accout-icon"
                  size="26"
                  onClick={() => {
                    setIsOpenAccount(true);
                  }}
                />
              )}
            </Icon>
            {localStorage.getItem("myId") && (
              <Icon onClick={logout}>Logout</Icon>
            )}
          </Buttons>
        </NavBox>
      </NavLayout>
      {isOpenAccount && <AccountModal closeAccount={closeAccount} />}
      {isOpenSearch && <SearchModal closeSearch={closeSearch} />}
    </>
  );
};

export default withRouter(Nav);

const NavLayout = styled.nav`
  position: fixed;
  z-index: 100;
  width: 100%;
  background: #ebe9e8;
  box-shadow: 0 1.2px 5px 0 rgba(0, 0, 0, 0.2);
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  margin: 0 auto;
  padding: 0 20px;

  img {
    max-height: 44px;
    width: auto;
    cursor: pointer;
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    width: 750px;
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  margin: 0 14px;
  cursor: pointer;
  color: #4a4a4a;

  @media (min-width: 375px) and (max-width: 768px) {
    margin: 5px;
  }

  &:hover {
    border-radius: 50%;
    background: rgba(211, 73, 41, 0.1);
    color: #333;
  }

  div {
    font-family: "IBMPlexSansKR-Text";
  }
`;
