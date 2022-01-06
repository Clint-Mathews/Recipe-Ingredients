import React from 'react'
import styled from 'styled-components';

function CloseButton({ deleteCategory }: { deleteCategory: () => void }) {
  return (
    <CloseBtn onClick={() => deleteCategory()}>
    </CloseBtn>
  )
}

export default CloseButton

const CloseBtn = styled.button`
  margin: 0;
  border: 0;
  padding: 0;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  overflow: hidden;
	position: relative;
	font: inherit;
	text-indent: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms;
  color:#40e0d0;
  &:hover,
  &:focus {
     color:red;
    background: #ffbcbc;
    transform: rotateZ(90deg);
  }

	
	&:focus {
		outline: solid 0 transparent;
		box-shadow: 0 0 0 2px #af0000
	}
	
	&:before, &:after {
		position: absolute;
		top: 15%; 
    left: calc(50% - .0625em);
		width: .125em;
    height: 70%;
		border-radius: .125em;
		transform: rotate(45deg);
		background: currentcolor;
		content: ''
	}
	
	&:after { transform: rotate(-45deg); }

`;

