import styled from "styled-components";

interface NameStyle {
  book?: boolean;
  underline?: boolean;
  follow?: boolean;
  posting?: boolean;
}

const Name = styled.div<NameStyle>`
  margin-top: 4px;
  color: #727272;
  font-size: ${(props) => props.book && "14px"};
  text-align: ${(props) => props.follow && "center"};

  &:hover {
    ${(props) =>
      props.underline &&
      `
        text-decoration: underline;
      color: #d3492a;
    `}
  }
  ${(props) =>
    props.posting &&
    `
  @media (max-width: 768px) {
    text-align: center;
  }
`}
`;

export default Name;
