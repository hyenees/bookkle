import styled from "styled-components";

interface ReviewBoxStyle {
  review?: boolean;
}

const Title = styled.h1<ReviewBoxStyle>`
  font-size: ${(props) => (props.review ? "22px" : "18px")};
  font-family: ${(props) => (props.review ? "NanumMyeongjo" : "")};
`;

export default Title;
