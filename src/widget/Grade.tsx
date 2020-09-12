import styled from "styled-components";

const Grade = styled.div`
  display: flex;
  justify-content: space-between;
  width: 150px;
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
