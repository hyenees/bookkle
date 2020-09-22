import React, { useState } from "react";
import api from "api";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { GoMail } from "react-icons/go";
import { RiLock2Line } from "react-icons/ri";
import InputBox from "widget/InputBox";
import Input from "widget/Input";
import Button from "widget/Button";
import { AccountTitle, AccountBox } from "widget/AccountTitle";

interface SignInProps extends RouteComponentProps {
  goToSignUp: () => void;
  closeAccount: () => void;
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

  const clickSignIn = async () => {
    try {
      const res = await api.signIn(signInValue.email, signInValue.password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("myId", res.data.user_id);
      props.closeAccount();
      props.history.push("/");
    } catch (err) {
      if (err.response.status === 400) {
        alert("이메일과 비밀번호를 확인해주세요.");
      }
    }
  };

  return (
    <>
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

export default withRouter(SignIn);
