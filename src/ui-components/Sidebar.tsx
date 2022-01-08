import React, { useState } from 'react'
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import RecipeIcon from './RecipeIcon';
import CatergoryIcon from './CatergoryIcon';
import Hamburger from './Hamburger';
import { useNavigate } from "react-router-dom";


function Sidebar() {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (open: any) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <SidebarHeading>Configurations</SidebarHeading>

            <Divider />
            <List>
                <ListItem button key="Category" onClick={() => navigate("/category")}>
                    <ListItemIcon>
                        <CatergoryIcon />
                    </ListItemIcon>

                    <ListItemText primary="Category" />

                </ListItem>
                <ListItem button key="Recipe" onClick={() => navigate("/recipe")}>
                    <ListItemIcon>
                        <RecipeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Recipe" />
                </ListItem>

            </List>
        </Box>
    );
    return (
        <>
            <Button onClick={toggleDrawer(true)}>
                <Hamburger />
            </Button>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </>
    )
}



export default Sidebar
const SidebarHeading = styled.h2`
padding: 17.3px;
background-color: #0a66c2;
color: white;
margin: 0;
`;