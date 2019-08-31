import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a {
        text-decoration: none;
        color:inherit;
    }
    * {
        box-sizing: border-box;
    }
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    body {
        font-size: 14px;
        background-color:#232F34;
        font-family: 'Montserrat', sans-serif;
        padding-top:50px;
    }
`;

export default globalStyles;
