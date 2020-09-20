import styled from "styled-components";

interface ReviewBoxStyle {
  review?: boolean;
  follow?: boolean;
  posting?: boolean;
}

const Title = styled.h1<ReviewBoxStyle>`
  font-size: ${(props) => (props.review ? "22px" : "18px")};
  font-family: ${(props) => (props.review ? "NanumMyeongjo" : "")};
  text-align: ${(props) => props.follow && "center"};

  ${(props) =>
    props.posting &&
    `
  @media (max-width: 768px) {
    text-align: center;
  }
`}
`;

export default Title;
