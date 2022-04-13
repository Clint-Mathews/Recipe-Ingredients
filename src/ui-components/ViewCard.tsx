import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Recipe } from '../models/Recipe';
import { useNavigate } from 'react-router-dom';

export default function ViewCard({ recipe }: { recipe: Recipe }) {
    const navigate = useNavigate();
    const navigateToIngredients = () => {
        navigate('/ingredients', { state: { recipe: recipe } })
    }
    return (
        <Card key={recipe.recipe_name} sx={{ margin: "20px" }} onClick={navigateToIngredients}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image={recipe.thumbnail}
                    alt={recipe.recipe_name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {recipe.recipe_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ height: 100, overflowY: "scroll" }} className="hideScrollBar">
                        {recipe.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}