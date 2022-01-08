import React from 'react'
import styled from 'styled-components';

function InputField({ editInput = false, type, value, onChange, onBlur = () => { } }: any) {
    return <Input className={editInput && 'showBorder'} type={type} value={value} onChange={(e) => onChange(e)} onBlur={(e) => onBlur(e)} />
}

export default InputField
const Input = styled.input`
margin: 0;
flex: 1;
border-radius:5px;
padding: 0;
border:0;
padding-left: 10px;
width: 80%;
height: 35px;
&.showBorder{
    height: 33px;
border: 1px solid rgb(0 0 0 / 30%) ;
}
transition: border 0.4s ease-in-out;   
:focus,:hover{
    color: black;
    outline: 0;
    &.showBorder{
    border: 1px solid #0a66c2 ;
}
}
`;