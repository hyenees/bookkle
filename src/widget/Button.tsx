import styled from "styled-components";

interface ButtonStyle {
  posting?: boolean;
  isActive?: boolean;
}

const Button = styled.button<ButtonStyle>`
  display: block;
  width: ${(props) => (props.posting ? "200px" : "100%")};
  height: 56px;
  margin: ${(props) => (props.posting ? "40px auto 30px" : "15px 0 0 0")};
  background: ${(props) => (props.isActive ? "#d3492a" : "#ebe9e8")};
  color: ${(props) => (props.isActive ? "#ebe9e8" : "#d3492a")};
  border-radius: 25px;
  font-weight: 700;
  font-family: "IBMPlexSansKR-Text";
  font-size: 14px;
  letter-spacing: 0.3px;

  &:hover {
    ${(props) =>
      props.posting &&
      `
    background :#e8e5e3;
  
  `}
  }
`;

export default Button;
