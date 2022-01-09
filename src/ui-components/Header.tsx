import React from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar';

function Header({ heading }: { heading: string }) {
    return (
        <Container>
            <Sidebar />
            <Heading>{heading}</Heading>
        </Container>
    )
}

export default Header

const Container = styled.div`
border-bottom: 1px solid whitesmoke;
display: flex;
background-color: #0a66c2;
position: sticky;
  top: 0;
      z-index: 100;
`;
const Heading = styled.h1`
margin: 0;
font-weight: 500;
color: white;
padding: 10px 0px 14px 0px;
`;
