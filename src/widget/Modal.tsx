import styled from "styled-components";

interface ModalStyle {
  review?: boolean;
}

export const ModalLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 150;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalBox = styled.div<ModalStyle>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: ${(props) => (props.review ? "35%" : "30%")};
  padding: ${(props) => props.review && "36px"};
  background: #fff;
  border-radius: 20px;

  ${(props) =>
    props.review &&
    `
    @media (min-width: 768px) and (max-width: 1366px) {
    width:  60%;
    height: 100%;
    overflow: scroll;
    }
    @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  `}

  @media (min-width: 768px) and (max-width: 1366px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;
