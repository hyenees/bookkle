import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "config";
import Nav from "components/Nav";
import Review from "components/Review";
import { ReviewData, Profile } from "type";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";

const MyPage: React.FunctionComponent = (props) => {
  const [data, setData] = useState<Array<ReviewData>>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    axios
      // .get("http://localhost:3000/data/reviews.json")
      .get(`${API_URL}/accounts/profile`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        // console.log(res.data);
        setProfile(res.data);
      });
  }, []);

  useEffect(() => {
    console.log("A");
    axios
      // .get("http://localhost:3000/data/reviews.json")
      .get(`${API_URL}/accounts/my-reviews`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("myReview", res.data.results);
        setData(res.data.results);
      });
  }, []);

  const deleteReview = (id: number) => {
    axios
      .delete(`${API_URL}/reviews/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("delete", res);
      });
  };

  return (
    <>
      {console.log("B")}
      <Nav />
      <Layout>
        <UserInfo>
          <TopTitle mode="mypage">
            안녕하세요, &nbsp;{profile?.nickname}님!
          </TopTitle>
          <TopTitle mode="mypage">
            <div className="followers">Followers</div>
            <div className="followers count">{profile?.follower_count}</div>
          </TopTitle>
        </UserInfo>
        <ListBoard>
          {data.map((review: ReviewData, idx: number) => (
            <Review
              review={review}
              idx={idx}
              mypage={true}
              deleteReview={deleteReview}
            />
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
  width: 60%;
  margin: 0 auto 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;
