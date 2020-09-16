import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "config";
// import { RouteComponentProps, withRouter } from "react-router-dom";
import { GoMail } from "react-icons/go";
import { RiLock2Line } from "react-icons/ri";
import Input from "widget/Input";
import Button from "widget/Button";
import { AccountTitle, AccountBox } from "widget/AccountTitle";

interface SignInProps {
  goToSignUp: () => void;
}

interface SignInValue {
  email: string;
  password: string;
}

const SignIn: React.FunctionComponent<SignInProps> = (props) => {
  const [signInValue, setSignInValue] = useState<SignInValue>({
    email: "",
    password: "",
  });

  const clickSignIn = () => {
    axios
      .post(`${API_URL}/accounts/signin`, {
        email: signInValue.email,
        password: signInValue.password,
      })
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("myId", res.data.user_id);
      });
  };

  return (
    <>
      {console.log(signInValue)}
      <AccountTitle>로그인</AccountTitle>
      <AccountBox>
        <InputBox>
          <Input
            placeholder="이메일 주소"
            onChange={(e) =>
              setSignInValue({ ...signInValue, email: e.target.value })
            }
          />
          <GoMail className="mail-icon" />
        </InputBox>
        <InputBox>
          <Input
            placeholder="비밀번호"
            type="password"
            onChange={(e) =>
              setSignInValue({ ...signInValue, password: e.target.value })
            }
          />
          <RiLock2Line className="lock-icon" />
        </InputBox>
        <Button
          onClick={clickSignIn}
          isActive={
            signInValue.email.length > 0 && signInValue.password.length > 0
          }
        >
          로그인
        </Button>
        <Button onClick={props.goToSignUp}>이메일로 가입하기</Button>
      </AccountBox>
    </>
  );
};

export default SignIn;

const InputBox = styled.div`
  position: relative;

  .mail-icon {
    position: absolute;
    top: 50%;
    right: 5%;
    color: #727272;
  }

  .lock-icon {
    position: absolute;
    top: 50%;
    right: 5%;
    color: #727272;
  }
`;
