import React from 'react'
import styled from 'styled-components'

function Header({ heading }: { heading: string }) {
    return (
        <Container>
            <Heading>{heading}</Heading>
        </Container>
    )
}

export default Header

const Container = styled.div`
border-bottom: 1px solid whitesmoke;
`;
const Heading = styled.h1`
margin: 0;
font-weight: 500;
padding-bottom: 10px;
border-bottom: 2px solid whitesmoke;
background-color: #0a66c2;
color: white;
padding: 10px 0px 10px 20px;;
`;
