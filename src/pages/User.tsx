import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import api from "api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reducers";
import {
  getProfile,
  getReviewList,
  removeReview,
  countFollower,
} from "actions";
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
  const [followers, setFollowers] = useState<number | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await api.getProfile(props.match.params.id);
      dispatch(getProfile(res));
      // if (res.is_follow) {
      //   setIsClickedFollowBtn(!isClickedFollowBtn);
      // }
      // setFollowers(res.follower_count);
    })();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    (async () => {
      const res = await api.getMyReviews(props.match.params.id);
      dispatch(getReviewList(res));
    })();
  }, [dispatch, props.match.params.id]);

  const deleteReview = async (id: number) => {
    const res = await api.removeReview(id);
    dispatch(removeReview(id));
  };

  const followUser = async (id: number | undefined) => {
    // const res = await api.followUser(id);
    // console.log("res", res);
    // setIsClickedFollowBtn(!isClickedFollowBtn);
    // if (followers !== undefined) {
    //   if (isClickedFollowBtn) {
    //     setFollowers(followers - 1);
    //   } else {
    //     setFollowers(followers + 1);
    //   }
    // }
    dispatch(countFollower());
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
                <CircleButton
                  mode="default"
                  onClick={() => followUser && followUser(profile?.id)}
                >
                  {profile?.is_follow ? (
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
              {/* {props.match.params.id === localStorage.getItem("myId")
                ? profile?.follower_count
                : followers} */}
              {profile?.follower_count}
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
  margin: 0 auto 40px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  @media (min-width: 1200px) {
    width: 1170px;
  }

  @media (max-width: 1200px) {
    width: 70%;
  }
`;
