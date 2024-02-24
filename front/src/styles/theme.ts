// 자주 쓰이는 스타일, ex 브랜드 컬러나 폰트 사이즈
// 각각의 타입을 typeof 연산자로 산출해 지정하고 다른 컴포넌트로 쓰일 수 있도록 export

import { DefaultTheme } from "styled-components";

const colors = {
    mainNavy: "#101957",
    mainBlue: "#4350A7",
}

const fontSize = {
    title: 20,
    text: 14,
}

export type ColorTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

const theme: DefaultTheme = {
    colors,
    fontSize,
};

export default theme;