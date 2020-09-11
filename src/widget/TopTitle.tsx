import styled from "styled-components";

interface PaddingStyle {
  bookList?: boolean;
}
const TopTitle = styled.h1<PaddingStyle>`
  padding: ${(props) => (props.bookList ? "50px 20px" : "0 20px")};
  /* font-family: "NanumMyeongjoBold"; */
  /* font-family: "NanumMyeongjo"; */
  font-family: "RIDIBatang";
  font-size: 36px;
  text-align: center;
`;

export default TopTitle;
