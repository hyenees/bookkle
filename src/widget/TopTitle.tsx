import styled from "styled-components";

interface PaddingStyle {
  bookList?: boolean;
  main?: boolean;
}
const TopTitle = styled.h1<PaddingStyle>`
  padding: ${(props) => (props.bookList ? "50px 20px" : "0 20px")};
  /* font-family: "NanumMyeongjoBold"; */
  /* font-family: "NanumMyeongjo"; */
  font-family: "RIDIBatang";
  font-size: ${(props) => (props.main ? "24px" : "36px")};
  text-align: center;

  span {
    background: rgba(211, 73, 41, 0.3);
  }
`;

export default TopTitle;
