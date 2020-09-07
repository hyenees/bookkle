import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset};
*{
    margin: 0px;
    padding: 0px;
    box-sizing:border-box;
}

body{
  font-family: NanumMyeongjo-Regular;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

@font-face {
  font-family: NanumMyeongjo-Regular;
  src:url("src/Styles/fonts/NanumMyeongjo-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
}

@font-face {
  font-family: NanumMyeongjo-Bold;
  src: url("src/Styles/fonts/NanumMyeongjo-Bold.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
}

ol,
ul,
li {
  list-style: none;
}

input:focus,
button:focus,
select:focus {
  outline: none;
}

button{
  cursor : pointer;
}
`;
export default GlobalStyle;
