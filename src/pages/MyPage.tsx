import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Nav from "components/Nav";
import Review from "components/Review";
import { ReviewInfo } from "pages/Main";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";

const MyPage = () => {
  const [data, setData] = useState<Array<ReviewInfo>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/reviews.json")
      // .get(`${API_URL}/reviews`)
      .then((res) => {
        console.log(res);
        setData(res.data.results);
      });
  }, []);

  return (
    <>
      <Nav />
      <Layout>
        <UserInfo>
          <TopTitle mode="mypage">
            안녕하세요, &nbsp;{data[0] && data[0].user_info.nickname}님!
          </TopTitle>
          <TopTitle mode="main">30</TopTitle>
        </UserInfo>
        <ListBoard>
          {data.map((review: ReviewInfo, idx: number) => (
            <Review review={review} idx={idx} mypage={true} />
          ))}
        </ListBoard>
      </Layout>
    </>
  );
};

export default MyPage;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 40px;
  width: 60%;
`;
