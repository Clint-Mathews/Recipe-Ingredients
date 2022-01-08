import React from 'react'
import styled from 'styled-components';

function SubHeading({ heading }: { heading: string }) {
    return (
        <SubHeadingContainer>{heading}</SubHeadingContainer>
    )
}

export default SubHeading
const SubHeadingContainer = styled.h2`
margin:  0 0 0 10px;
font-size:1.6rem;
`;