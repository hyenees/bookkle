import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AccountModal from "pages/Account/AccountModal";
import SearchModal from "pages/SearchModal";
import logo from "images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";

const Nav: React.FunctionComponent<RouteComponentProps> = (props) => {
  const [isOpenAccount, setIsOpenAccount] = useState<boolean>(false);
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const closeSearch = () => {
    setIsOpenSearch(false);
  };

  const closeAccount = () => {
    setIsOpenAccount(false);
  };

  return (
    <>
      <NavLayout>
        <NavBox>
          <img src={logo} alt="bookkle" />
          <Icons>
            <Icon>
              <BiBookAdd
                className="post"
                size="26"
                onClick={() => setIsOpenSearch(true)}
              />
            </Icon>
            <Icon>
              {localStorage.getItem("token") ? (
                <div onClick={() => props.history.push("/mypage")}>Hello</div>
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
          </Icons>
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
  }
  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    width: 750px;
  }
`;

const Icons = styled.div`
  display: flex;
  margin-right: -10px;

  * {
    color: #4a4a4a;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;

  div {
    font-family: "IBMPlexSansKR-Text";
  }
`;
