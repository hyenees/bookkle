import styled from "styled-components";

interface TopTitleStyle {
  mode: "bookList" | "main" | "quote" | "post";
}

const handleFontSizeType = (mode: string) => {
  switch (mode) {
    case "main":
      return "24px";
    case "quote":
      return "34px";
    default:
      return "36px";
  }
};

const handlePaddingType = (mode: string) => {
  switch (mode) {
    case "bookList":
      return "50px 20px";
    case "quote":
      return "20px 0 10px";
    default:
      return "30px 20px";
  }
};

const TopTitle = styled.h1<TopTitleStyle>`
  padding: ${({ mode }) => handlePaddingType(mode)};
  /* font-family: "NanumMyeongjoBold"; */
  /* font-family: "NanumMyeongjo"; */
  font-family: "RIDIBatang";
  font-size: ${({ mode }) => handleFontSizeType(mode)};
  text-align: center;
  word-break: ${(props) => props.mode === "quote" && "keep-all"};

  span {
    background: rgba(211, 73, 41, 0.3);
  }
`;

export default TopTitle;
