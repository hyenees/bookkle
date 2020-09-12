import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "config";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Input from "widget/Input";
import Button from "widget/Button";
import { AccountTitle, AccountBox } from "widget/AccountTitle";

interface SignUpValue {
  nickname: string;
  email: string;
  password: string;
  pwCheck: string;
}

interface ErrMessage {
  email: string[];
  nickname: string[];
}

const pwReg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,16}$/;

const SignUp: React.FunctionComponent = (props) => {
  const [signUpValue, setSignUpValue] = useState<SignUpValue>({
    nickname: "",
    email: "",
    password: "",
    pwCheck: "",
  });

  const [pwValid, setPwVaild] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<ErrMessage | null>(null);

  const clickSignUp = () => {
    axios
      .post(`${API_URL}/accounts/signup`, {
        email: signUpValue.email,
        nickname: signUpValue.nickname,
        password: signUpValue.password,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response);
        setErrMsg(err.response.data);
      });
  };

  return (
    <>
      {console.log(errMsg)}
      <AccountTitle>회원가입</AccountTitle>
      <AccountBox>
        <InputBox>
          <Input
            placeholder="닉네임"
            onChange={(e) =>
              setSignUpValue({
                ...signUpValue,
                nickname: e.target.value,
              })
            }
          />
        </InputBox>
        {errMsg && errMsg.nickname && (
          <div className="text">중복된 닉네임입니다.</div>
        )}
        <InputBox>
          <Input
            placeholder="이메일 주소"
            onChange={(e) =>
              setSignUpValue({ ...signUpValue, email: e.target.value })
            }
          />
        </InputBox>
        {errMsg && errMsg.email && (
          <div className="text">이미 가입된 이메일입니다.</div>
        )}
        <InputBox>
          <Input
            placeholder="비밀번호"
            type="password"
            onChange={(e) =>
              setSignUpValue({ ...signUpValue, password: e.target.value })
            }
          />
        </InputBox>
        <InputBox>
          <Input
            placeholder="비밀번호 확인"
            type="password"
            onChange={(e) =>
              setSignUpValue({ ...signUpValue, pwCheck: e.target.value })
            }
          />
        </InputBox>
        <Button onClick={clickSignUp}>가입하기</Button>
      </AccountBox>
    </>
  );
};

export default SignUp;

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
