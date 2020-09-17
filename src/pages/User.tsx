import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import { getReviewList, getProfile, removeReview } from "actions";
import { API_URL } from "config";
import Nav from "components/Nav";
import Review from "components/Review";
import { BsPersonPlusFill } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";
import { CircleButton } from "widget/SmallButton";

interface UserProps {
  id: string;
}

const User: React.FunctionComponent<RouteComponentProps<UserProps>> = (
  props
) => {
  const { profile } = useSelector((state: RootState) => state.UserReducer);
  const [isClickedFollowBtn, setIsClickedFollowBtn] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      // .get("http://localhost:3000/data/reviews.json")
      .get(`${API_URL}/accounts/profile/${props.match.params.id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(getProfile(res.data));
      });
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    console.log("A");
    axios
      // .get("http://localhost:3000/data/reviews.json")
      .get(`${API_URL}/accounts/my-reviews/${props.match.params.id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("myReview", res.data.results);
        dispatch(getReviewList(res.data.results));
      });
  }, [dispatch, props.match.params.id]);

  const deleteReview = (id: number) => {
    axios
      .delete(`${API_URL}/reviews/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        console.log("delete", res);
        dispatch(removeReview(id));
      });
  };

  const followUser = async () => {
    const response = await axios.post(
      `${API_URL}/accounts/follow`,
      { follow_to: profile?.id },
      {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      }
    );
    console.log(response);
    setIsClickedFollowBtn(!isClickedFollowBtn);
  };

  return (
    <>
      <Nav />
      <Layout>
        <UserInfo>
          <TopTitle mode="mypage">
            {localStorage.getItem("myId") === props.match.params.id ? (
              `안녕하세요,  ${profile?.nickname}님!`
            ) : (
              <>
                {profile?.nickname}
                &nbsp;&nbsp;
                <CircleButton mode="default" onClick={followUser}>
                  {profile?.is_follow ? (
                    isClickedFollowBtn ? (
                      <BsPersonPlus size="26" />
                    ) : (
                      <BsPersonPlusFill size="26" />
                    )
                  ) : isClickedFollowBtn ? (
                    <BsPersonPlusFill size="26" />
                  ) : (
                    <BsPersonPlus size="26" />
                  )}
                </CircleButton>
              </>
            )}
          </TopTitle>
          <TopTitle mode="mypage">
            <div className="followers">Followers</div>
            <div className="followers count">
              {isClickedFollowBtn
                ? profile && profile?.follower_count + 1
                : profile?.follower_count}
            </div>
          </TopTitle>
        </UserInfo>
        <ListBoard>
          <Review myId={props.match.params.id} deleteReview={deleteReview} />
        </ListBoard>
      </Layout>
    </>
  );
};

export default User;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 60%; */
  margin: 0 auto 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    width: 750px;
  }
`;
