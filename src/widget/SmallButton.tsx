import styled from "styled-components";

interface ButtonStyle {
  mode: "default" | "detail" | "text";
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

const handleMarginType = (mode: string) => {
  switch (mode) {
    case "detail":
      return "10px 0 0 0";
    case "text":
      return "0";
    default:
      return "30px 0 10px";
  }
};

export const TextButton = styled.button`
  padding-left: 10px;
  background: none;
  color: #727272;
`;

export const CircleButton = styled.button<ButtonStyle>`
  width: 40px;
  height: 40px;
  margin: 5px;
  background: ${(props) => (props.mode === "detail" ? "#f4f4f4" : "#fff")};
  border-radius: 50%;
  color: #4a4a4a;
`;

export const Buttons = styled.div<ButtonStyle>`
  display: flex;
  justify-content: ${({ mode }) => handleAlignType(mode)};
  margin: ${({ mode }) => handleMarginType(mode)};
`;
