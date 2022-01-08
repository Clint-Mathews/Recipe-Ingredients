import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Recipe } from '../models/Recipe';
import styled from 'styled-components';
import Ingredients from './Ingredients';

function Cards({ recipe }: { recipe: Recipe }) {

    return (
        <Card key={recipe.title} sx={{ margin: "20px" }}>
            <CardMedia
                component="img"
                height="100"
                image={recipe.thumbnail}
                alt={recipe.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                    {recipe.title}
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
                <Button size="small">Edit</Button>
                <Button color="error" size="small">Delete</Button>
            </CardActions>
        </Card >
    );
}
export default Cards

const ViewIngedients = styled.div`
display: flex;
cursor:pointer;
`;
