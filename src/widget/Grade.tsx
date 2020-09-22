import styled from "styled-components";

interface GradeStyle {
  follow?: boolean;
}
const Grade = styled.div<GradeStyle>`
  display: flex;
  justify-content: space-between;
  margin: ${(props) => props.follow && "0 auto"};
  width: 120px;
  padding-top: 15px;
  color: #4a4a4a;

  .select {
    color: #d3492a;
  }

  .posting:hover {
    color: #d3492a;
    cursor: pointer;
  }
  .rating {
    color: #d3492a;
  }
`;

export default Grade;
