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
  font-family: 'IBMPlexSansKR-Regular';
  font-size : 16px;
  color : #333333;
  line-height: 1.5;
}

@font-face {
    font-family: 'IBMPlexSansKR-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}


@font-face {
    font-family: 'SunBatang-Light';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/SunBatang-Light.woff') format('woff');
    font-weight: normal;
    font-style: normal;
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
  border: none;
}
`;

export default GlobalStyle;
