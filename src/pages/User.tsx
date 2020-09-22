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
import Loading from "components/Loading";
import { BsPersonPlusFill } from "react-icons/bs";
import { BsPersonPlus } from "react-icons/bs";
import Layout from "widget/Layout";
import ListBoard from "widget/ListBoard";
import TopTitle from "widget/TopTitle";
import { CircleButton } from "widget/SmallButton";
import EmptyMsg from "widget/EmptyMsg";

interface UserProps {
  id: string;
}

const User: React.FunctionComponent<RouteComponentProps<UserProps>> = (
  props
) => {
  const { profile } = useSelector((state: RootState) => state.UserReducer);
  const { reviews } = useSelector((state: RootState) => state.ReviewReducer);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const res = await api.getProfile(props.match.params.id);
      dispatch(getProfile(res));
      setIsLoading(false);
    })();
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    (async () => {
      const res = await api.getMyReviews(props.match.params.id);
      dispatch(getReviewList(res));
    })();
  }, [dispatch, props.match.params.id]);

  const deleteReview = async (id: number) => {
    await api.removeReview(id);
    dispatch(removeReview(id));
  };

  const followUser = async (id: number | undefined) => {
    await api.followUser(id);
    dispatch(countFollower());
  };

  return (
    <>
      <Nav />
      {isLoading ? (
        <Loading />
      ) : (
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
              <div className="followers count">{profile?.follower_count}</div>
            </TopTitle>
          </UserInfo>
          {reviews.length > 0 ? (
            <ListBoard>
              <Review
                myId={props.match.params.id}
                deleteReview={deleteReview}
              />
            </ListBoard>
          ) : (
            <EmptyMsg>
              <TopTitle mode="main">등록된 리뷰가 없습니다.</TopTitle>
            </EmptyMsg>
          )}
        </Layout>
      )}
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
