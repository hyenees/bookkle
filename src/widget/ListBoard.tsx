import styled from "styled-components";

interface ListBoardStyle {
  following?: boolean;
}
const ListBoard = styled.section<ListBoardStyle>`
  display: flex;
  flex-wrap: wrap;
  /* width: 70%; */
  margin: 0 auto;
  padding: 70px 0 0 0;

  @media (min-width: 1200px) {
    width: ${(props) => (props.following ? "1170px" : "70%")};
  }

  @media (min-width: 768px) and (max-width: 1200px) {
    width: 750px;
  }
`;

export default ListBoard;
