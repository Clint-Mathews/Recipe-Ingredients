import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Recipe } from '../models/Recipe';
import styled from 'styled-components';
import Ingredients from './Ingredients';
import RecipeModal from './RecipeModal';
import RecipeDeleteModal from './RecipeDeleteModal';

function Cards({ recipe, category }: { recipe: Recipe, category: string }) {
    const [openRecipeEdit, setOpenRecipeEdit] = useState(false);
    const handleOpenRecipeEdit = () => setOpenRecipeEdit(true);
    const handleCloseRecipeEdit = () => setOpenRecipeEdit(false);
    const [openRecipedelete, setOpenRecipedelete] = useState(false);
    const handleOpenRecipeDelete = () => setOpenRecipedelete(true);
    const handleCloseRecipeDelete = () => setOpenRecipedelete(false);
    return (
        <Card key={recipe.recipe_name} sx={{ margin: "20px" }}>
            <CardMedia
                component="img"
                height="100"
                image={recipe.thumbnail}
                alt={recipe.recipe_name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    {recipe.recipe_name}
                    <ViewIngedients><Ingredients /></ViewIngedients>
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ height: 100, overflowY: "scroll" }} className="hideScrollBar">
                    {recipe.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing={true} style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 50%)"
            }}>
                <Button onClick={handleOpenRecipeEdit} size="small">Edit</Button>
                <Button onClick={handleOpenRecipeDelete} color="error" size="small">Delete</Button>
                {openRecipeEdit && <RecipeModal category={category} isAdd={false} recipe={recipe} open={openRecipeEdit} handleClose={handleCloseRecipeEdit} />}
                {openRecipedelete && <RecipeDeleteModal recipe={recipe} open={openRecipedelete} handleClose={handleCloseRecipeDelete} />}
            </CardActions>
        </Card >
    );
}
export default Cards

const ViewIngedients = styled.div`
display: flex;
cursor:pointer;
`;
