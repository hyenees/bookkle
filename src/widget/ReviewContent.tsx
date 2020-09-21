import styled from "styled-components";

interface ContentsStyle {
  follow?: boolean;
  review?: boolean;
}

export const ReviewContent = styled.div<ContentsStyle>`
  ${(props) =>
    props.follow &&
    `
    flex: 5;
    align-self: center;
    `}
  width: 100%;
  min-height: ${(props) => props.review && "278px"};
  letter-spacing: 0.3px;
  text-align: center;
`;

export const Contents = styled.div<ContentsStyle>`
  height: ${(props) => props.follow && "auto"};
  margin-top: 18px;
  text-align: ${(props) => (props.follow ? "justify" : "left")};
  font-family: "IBMPlexSansKR-Light";
  white-space: pre-line;
`;
