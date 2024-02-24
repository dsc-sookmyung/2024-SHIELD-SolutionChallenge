import styled from "styled-components";

interface InputProps{
    props_placeholder: string,
    props_type: string,
}

const StyledInput = styled.input`
    width: 300px;
    height: 50px;
    padding-left: 10px;
    margin: 20px 0px;
    border: 0px;
    border-radius: 3px;
`

const Input = ({ props_placeholder, props_type }: InputProps) => {
    return(
        <StyledInput 
            placeholder={props_placeholder} 
            type={props_type}/>
    )
}

export default Input