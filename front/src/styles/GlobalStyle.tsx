// 브라우저마다 다른 기본 스타일을 초기화하고
// 전역에서 쓰일 스타일들을 정의
import { createGlobalStyle } from "styled-components";
import theme from "../styles/theme";
export const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
    }

    body{
        margin: 0px;
    }

    a{
        color:inherit;
        text-decoration: none;
        cursor: pointer;
    }

    ul, ol, li{
        list-style: none;
    }

    #root{
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
    }

    hr{
        width: 80%;
        height: 2px;
        background-color:  ${theme.colors.mainNavy};
    }

    h4{
        margin-top: 0px;
    }

    h5, h6{
        margin: 0px;
    }

    button{
        padding: 10px;
    }

    input:focus{
        outline: none;
    }
`;