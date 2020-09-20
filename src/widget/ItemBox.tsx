import styled from "styled-components";

interface ItemBoxStyle {
  right?: boolean;
  mode: "review" | "bookList";
}

const ItemBox = styled.div<ItemBoxStyle>`
  width: 23.5%;
  padding: 0 30px 10px;
  margin-bottom: ${(props) => (props.mode === "bookList" ? "80px" : "100px")};
  margin-right: ${(props) => (props.right ? 0 : "2%")};
  ${(props) =>
    props.mode === "review" &&
    `
    border-radius: 25px;
    background: #fcf1ef;
`}
  cursor : pointer;

  @media (min-width: 1200px) and (max-width: 1366px) {
    width: 31.2%;
    margin-right: 2%;
  }
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 48%;
    margin-right: 2%;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }

  .book-info {
    text-align: center;
  }
`;

export default ItemBox;
