import styled from "styled-components";

interface NameStyle {
  book?: boolean;
  underline?: boolean;
}

const Name = styled.span<NameStyle>`
  margin-top: 4px;
  color: #727272;
  font-size: ${(props) => props.book && "14px"};

  &:hover {
    ${(props) =>
      props.underline &&
      `
        text-decoration: underline;
      color: #d3492a;
    `}
  }
`;

export default Name;
