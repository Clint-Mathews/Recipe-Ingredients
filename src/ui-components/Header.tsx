import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../utils/authSlice';
import Sidebar from './Sidebar';

function Header({ heading, hideSideBar, showAdd }: { heading: string, hideSideBar?: boolean, showAdd?: boolean }) {
    const isLoggedIn: boolean = useAppSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const navOrLogout = () => {
        isLoggedIn ? dispatch(logout()) : navigate(-1);
    }
    return (
        <Container>
            <SubContainer>
                {!hideSideBar && <Sidebar />}
                <Heading hideSideBar={hideSideBar}>{heading}</Heading>
            </SubContainer>
            <ButtonContainer>
                {hideSideBar && !showAdd && <BackButtom onClick={() => navigate('/login')} > <span className="button-text">Add Recipes </span></BackButtom>}
                <BackButtom onClick={() => navOrLogout()} > <span className="button-text"> {isLoggedIn ? "Logout" : "Go back"} </span></BackButtom>
            </ButtonContainer>
        </Container >
    )
}

export default Header

const Container = styled.div`
border-bottom: 1px solid whitesmoke;
display: flex;
justify-content: space-between;
align-items: center;
background-color: #0a66c2;
position: sticky;
  top: 0;
      z-index: 100;
`;
const SubContainer = styled.div`
display: flex;
`;
const Heading = styled.h1<{ hideSideBar?: boolean }>`
margin: 0;
font-weight: 500;
color: white;
padding: 10px 0px 14px 0px;
${({ hideSideBar }) => hideSideBar && `
    padding-left: 20px;
  `}

`;
const ButtonContainer = styled.div``;
const BackButtom = styled.button`
margin-right: 20px;
width: 100px;
background: white;
color: #0a66c2;
border: 0;
height: 34px;
border: 0;
border-radius: 5px;
transition: all 0.2s ease-in-out;

:hover,:focus,:active{
cursor: pointer;
background: #e3e3e3;
}
`;
