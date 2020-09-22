import React from "react";
import styled from "styled-components";
import logo from "images/logoface.png";

const Loading = () => {
  return (
    <LoadingPage>
      <div>
        <img src={logo} alt="loading" />
        <div className="text">Loading...</div>
      </div>
    </LoadingPage>
  );
};

export default Loading;

const LoadingPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  img {
    display: block;
    margin: 0 auto;
    filter: opacity(80%);
  }

  .text {
    padding-top: 15px;
    font-size: 30px;
    font-family: "RIDIBatang";
    color: #727272;
  }
`;
