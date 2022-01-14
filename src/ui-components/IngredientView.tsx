import React, { useState } from 'react'
import styled from 'styled-components';
import { Ingredient } from '../models/Ingredient'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IngredientModal from './IngredientModal';
import IngredientDeleteModal from './IngredientDeleteModal';

function IngredientView({ ingredient }: { ingredient: Ingredient }) {
    const [openIngredientEdit, setOpenIngredientEdit] = useState(false);
    const handleOpenIngredientEdit = () => setOpenIngredientEdit(true);
    const handleCloseIngredientEdit = () => setOpenIngredientEdit(false);
    const [openIngredientdelete, setOpenIngredientdelete] = useState(false);
    const handleOpenIngredientDelete = () => setOpenIngredientdelete(true);
    const handleCloseIngredientDelete = () => setOpenIngredientdelete(false);
    return (
        <IngredientContainer>
            <ListItem className="Clint"
                key={ingredient.id}
                secondaryAction={
                    <ButtonContainer>
                        <Button type="button" onClick={handleOpenIngredientEdit} className="update"> <EditIcon /></Button>
                        <Button type="button" onClick={handleOpenIngredientDelete} className="delete"> <DeleteIcon /></Button>
                    </ButtonContainer>
                }
                disablePadding
            >
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar
                            alt={ingredient.title}
                            src={ingredient.thumbnail}
                        />
                    </ListItemAvatar>
                    <ListItemText id={ingredient.title} primary={ingredient.title} />
                </ListItemButton>
            </ListItem>
            {openIngredientEdit && <IngredientModal recipeName={ingredient.recipe_name} isAdd={false} ingredient={ingredient} open={openIngredientEdit} handleClose={handleCloseIngredientEdit} />}
            {openIngredientdelete && <IngredientDeleteModal ingredient={ingredient} open={openIngredientdelete} handleClose={handleCloseIngredientDelete} />}
        </IngredientContainer>
    )
}

export default IngredientView
const IngredientContainer = styled.div`
/* margin-top:10px; */
`;
const ButtonContainer = styled.div``;
const Button = styled.button`
    border: 0;
    color: #0a66c2;
    background: inherit;
    &.update{
        margin-right: 10px;
    }
    &.delete{
        color: rgb(0 0 0 / 18%);
    }
    :hover,:focus,:active{
cursor: pointer;
color:#004c99;
&.delete{
color: rgb(0 0 0 / 28%)
}
}
`;
