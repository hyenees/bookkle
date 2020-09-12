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

  .buttons {
    display: flex;
    margin: 30px 0 10px;
  }

  .book-info {
    text-align: center;
  }
`;

export default ItemBox;
