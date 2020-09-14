import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { API_URL } from "config";
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

const pwReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

const SignUp: React.FunctionComponent = (props) => {
  const [signUpValue, setSignUpValue] = useState<SignUpValue>({
    nickname: "",
    email: "",
    password: "",
    pwCheck: "",
  });
  const [errMsg, setErrMsg] = useState<ErrMessage | null>(null);
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);

  const clickSignUp = () => {
    if (
      pwReg.test(signUpValue.password) &&
      signUpValue.email.includes("@" && ".") &&
      signUpValue.nickname.length > 0
    ) {
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
      setIsBtnClicked(true);
    }
  };

  return (
    <>
      {isBtnClicked && errMsg === null ? (
        <Notification>인증메일이 발송되었습니다.</Notification>
      ) : (
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
            {!pwReg.test(signUpValue.password) &&
              signUpValue.password.length > 0 && (
                <div className="text">
                  영소문자, 숫자, 특수문자를 포함한 8자리를 입력하세요.
                </div>
              )}
            <Button
              onClick={clickSignUp}
              isActive={
                pwReg.test(signUpValue.password) &&
                signUpValue.email.includes("@" && ".") &&
                signUpValue.nickname.length > 0
              }
            >
              가입하기
            </Button>
          </AccountBox>
        </>
      )}
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

const Notification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 354px;
  font-family: "IBMPlexSansKR-Text";
  font-size: 26px;
`;
