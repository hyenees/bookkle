import styled from "styled-components";

interface LogoImgStyle {
  logo?: boolean;
  bookList?: boolean;
  review?: boolean;
}

export const BookImgBox = styled.div<LogoImgStyle>`
  width: ${(props) => (props.review ? "88.95px" : "120px")};
  height: ${(props) => (props.review ? "130px" : "174px")};
  margin: ${(props) => props.bookList && "0 auto 30px"};
  border: ${(props) => props.logo && "1px solid #f4f4f4"};
  ${(props) =>
    props.logo &&
    `
    display: flex;
    justify-content : center;
    align-items: center;.
    `}

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const BookImg = styled.img<LogoImgStyle>`
  display: block;
  width: ${(props) => (props.logo ? "80%" : "100%")};
  object-fit: cover;
  filter: ${(props) => props.logo && "opacity(50%)"};
`;
