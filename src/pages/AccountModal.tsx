import React, { useState } from "react";
import styled from "styled-components";
import { GoMail } from "react-icons/go";
import { RiLock2Line } from "react-icons/ri";
import Input from "widget/Input";

interface AccountModalProps {
  closeAccount: () => void;
}

const AccountModal: React.FunctionComponent<AccountModalProps> = (props) => {
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const { closeAccount } = props;
  return (
    <ModalLayout onClick={closeAccount}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {openSignUp ? (
          <>
            <AccountTitle>회원가입</AccountTitle>
            <AccountBox>
              <InputBox>
                <Input placeholder="닉네임" />
                <CheckBtn>중복확인</CheckBtn>
              </InputBox>
              <div className="text">다른 이름을 입력해주세요.</div>
              {/* <div className="text">사용가능한 이름입니다.</div>  */}
              <InputBox>
                <Input placeholder="이메일 주소" />
                <CheckBtn>인증메일 발송</CheckBtn>
              </InputBox>
              <InputBox>
                <Input placeholder="비밀번호" />
              </InputBox>
              <Button>가입하기</Button>
            </AccountBox>
          </>
        ) : (
          <>
            <AccountTitle>로그인</AccountTitle>
            <AccountBox>
              <InputBox>
                <Input placeholder="이메일 주소" />
                <GoMail className="mail-icon" />
              </InputBox>
              <InputBox>
                <Input placeholder="비밀번호" />
                <RiLock2Line className="lock-icon" />
              </InputBox>
              <Button>로그인</Button>
              <Button onClick={() => setOpenSignUp(!openSignUp)}>
                이메일로 가입하기
              </Button>
            </AccountBox>
          </>
        )}
      </ModalBox>
    </ModalLayout>
  );
};

export default AccountModal;

const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 150;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 30%;
  background: #fff;
  border-radius: 20px;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  margin-top: 15px;
  background: #ebe9e8;
  border-radius: 5px;
  color: #d3492a;
  font-weight: 700;
`;

const AccountTitle = styled.div`
  padding: 15px 24px;
  border-bottom: 1px solid #f4f4f4;
  font-family: "IBMPlexSansKR-Text";
  text-align: center;
`;

const AccountBox = styled.div`
  padding: 24px;

  .text {
    padding-left: 11px;
    font-size: 12px;
    color: #d3492a;
  }
`;

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

const CheckBtn = styled.div`
  position: absolute;
  top: calc(50% + 5px);
  right: 11px;
  transform: translateY(-50%);
  font-family: "IBMPlexSansKR-Text";
  font-size: 14px;
  color: #d3492a;
  cursor: pointer;
`;
