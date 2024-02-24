import styled from "styled-components";
import theme from "../styles/theme";
import { ReactNode } from 'react';;

interface ButtonProps{
    text: ReactNode;
    length?: string;
	onClick?: () => void;
}

const StyledButton = styled.button`
    width: 80%;
    height: 40px;
    background-color: ${theme.colors.mainNavy};
    color: #FFFFFF;
    border-radius: 5px;
    border: 1px solid ${theme.colors.mainNavy};
`

const Button = ({ text, length="long", onClick }: ButtonProps) => {
    return(
        <StyledButton onClick={onClick} id={length}>
            {text}
        </StyledButton>
    )
}

export default Button