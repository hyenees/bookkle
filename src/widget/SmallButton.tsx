import styled from "styled-components";

interface ButtonStyle {
  mode: "default" | "detail" | "text" | "nav";
}

const handleAlignType = (mode: string) => {
  switch (mode) {
    case "detail":
      return "center";
    case "text":
      return "space-between";
    default:
      return "flex-start";
  }
};

export const TextButton = styled.button`
  height: 25px;
  padding: 0 7px;
  background: none;
  color: #727272;
  &:hover {
    color: #000;
  }
`;

export const CircleButton = styled.button<ButtonStyle>`
  width: 40px;
  height: 40px;
  margin: ${(props) => props.mode === "detail" && "10px 0 0 0"};
  background: ${(props) => (props.mode === "detail" ? "#f4f4f4" : "#fff")};
  border-radius: 50%;
  color: #4a4a4a;
  &:hover {
    background: #f4f4f4;
  }
`;

export const Buttons = styled.div<ButtonStyle>`
  display: flex;
  justify-content: ${({ mode }) => handleAlignType(mode)};
  align-items: center;
  padding: ${(props) => props.mode === "text" && "30px 0 10px 0"};
  margin-right: ${(props) => props.mode === "nav" && "-10px"};
`;
