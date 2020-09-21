import React, { useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { ModalLayout, ModalBox } from "widget/Modal";

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
          <SignIn
            goToSignUp={() => setOpenSignUp(!openSignUp)}
            closeAccount={props.closeAccount}
          />
        )}
      </ModalBox>
    </ModalLayout>
  );
};

export default withRouter(AccountModal);
