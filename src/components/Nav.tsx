import React from "react";
import styled from "styled-components";
import logo from "images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";

const Nav: React.FunctionComponent = () => {
  return (
    <NavLayout>
      <NavBox>
        <img src={logo} alt="bookkle" />
        <Icons>
          <Icon>
            <MdAccountCircle className="accout-icon" size="26" />
          </Icon>
          <Icon>
            <BiBookAdd className="post" size="26" />
          </Icon>
        </Icons>
      </NavBox>
    </NavLayout>
  );
};

export default Nav;

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
  padding: 0 10px;
  cursor: pointer;
`;
