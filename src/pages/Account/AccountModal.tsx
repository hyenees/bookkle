import React, { useState } from "react";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AccountModalProps extends RouteComponentProps {
  closeAccount: () => void;
}

const AccountModal: React.FunctionComponent<AccountModalProps> = (props) => {
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  return (
    <ModalLayout onClick={props.closeAccount}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {openSignUp ? (
          <SignUp />
        ) : (
          <SignIn goToSignUp={() => setOpenSignUp(!openSignUp)} />
        )}
      </ModalBox>
    </ModalLayout>
  );
};

export default withRouter(AccountModal);

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
