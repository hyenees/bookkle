import styled from "styled-components";

interface NameStyle {
  book?: boolean;
}

const Name = styled.span<NameStyle>`
  margin-top: 4px;
  color: #727272;
  font-size: ${(props) => props.book && "14px"};
`;

export default Name;
