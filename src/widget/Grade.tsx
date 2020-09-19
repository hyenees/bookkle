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
    color: #da2a00;
  }

  .posting:hover {
    color: #da2a00;
    cursor: pointer;
  }
  .rating {
    color: #da2a00;
  }
`;

export default Grade;
