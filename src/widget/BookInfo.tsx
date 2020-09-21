import styled from "styled-components";

interface PostingStyle {
  posting?: boolean;
  detail?: boolean;
  review?: boolean;
}

const BookInfo = styled.div<PostingStyle>`
  display: flex;
  justify-content: ${(props) => (props.review ? "space-around" : "center")};
  margin: ${(props) => (props.posting ? "30px auto 40px" : "10px auto 40px")};

  .book-title {
    padding: 15px 0 0 15px;
    align-self: center;
  }

  ${(props) =>
    props.detail &&
    `
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
  `}

  ${(props) =>
    props.posting &&
    `
    width :  60%;
    @media (min-width: 768px) and (max-width: 1200px) {
        width: 80%;
    }
    @media (max-width: 768px) {
        display: block;
        width: 80%;
        margin: 10px auto 20px;
  }
`}
`;

export default BookInfo;
