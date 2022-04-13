import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import ingredientApiService from '../utils/ingredients-api.service';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setIngredients } from '../utils/ingredientSlice';
import IngredientView from './IngredientView';
import { Ingredient } from '../models/Ingredient';
import { Draggable, Droppable, DragDropContext, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd'
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import updateIngredientData from '../utils/updateIngredientData';
import updateIngredientOrder from '../utils/updateIngredientOrder';
import toastService, { ToastType } from '../utils/taostService';

function IngedientsList({ recipeName }: { recipeName: string }) {
    const [ingredientsLoader, setIngredientsLoader] = useState(false);
    const ingredients: any = useAppSelector((state) => state.ingredients.ingredients);
    const dispatch = useAppDispatch();
    const fetchIngredietsBasedOnRecipe = async () => {
        const data = await ingredientApiService.getIngredientsBasedOnRecipe(recipeName);
        dispatch(setIngredients(data?.data?.ingredients?.values));
        setIngredientsLoader(false);
    }
    useEffect(() => {
        setIngredientsLoader(true);
        fetchIngredietsBasedOnRecipe();
    }, []);
    const onDragEnd = async (e: any) => {
        const { destination, source, reason } = e;
        if (!destination || reason === 'CANCEL') return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        console.log(ingredients);
        const ingredientsToUpdate = updateIngredientOrder(JSON.parse(JSON.stringify(ingredients)), source.index, destination.index);
        console.log(ingredientsToUpdate);
        const startIndex = source.index < destination.index ? source.index : destination.index;
        const endIndex = source.index === startIndex ? destination.index : source.index;
        dispatch(setIngredients(ingredientsToUpdate));
        for (let count = startIndex; count <= endIndex; count++) {
            const responseData = await ingredientApiService.updateIngredient(ingredientsToUpdate[count]);
            // console.log(responseData);
        }
        toastService({ text: `Ingredients ordering updated`, toastType: ToastType.Success });
    }
    return (
        <>
            {
                ingredientsLoader ?
                    <SeletionLoadingContainer>
                        {
                            [...Array(5)].map((e, i) => {
                                return (
                                    <Grid item xs>
                                        <Typography component="div" key={`${i}-h3`} variant='h3'>
                                            <Skeleton />
                                        </Typography>
                                    </Grid>
                                )
                            })
                        }
                    </SeletionLoadingContainer>
                    : (
                        ingredients && ingredients.length ? <CardContainer key="CardContainer">
                            <Container>
                                <DragDropContext onDragEnd={onDragEnd} >
                                    <Droppable droppableId="ingredients">
                                        {(provided: DroppableProvided) => (
                                            <DroppableWrapper ref={provided.innerRef} {...provided.droppableProps}>
                                                {ingredients.map((item: Ingredient, index: number) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id?.toString()} index={index}>
                                                            {(provided: DraggableProvided) => (
                                                                <DraggableWrapper className="drag" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    < IngredientView ingredient={item} />
                                                                </DraggableWrapper>
                                                            )}

                                                        </Draggable>
                                                    )
                                                })
                                                }
                                                {provided.placeholder}
                                            </DroppableWrapper>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Container>
                        </CardContainer>
                            :
                            <NoData key="NoData">
                                <ShowMsg key="ShowMsg">No Ingredients!</ShowMsg>
                            </NoData>
                    )
            }
        </>
    )
}
export default IngedientsList

const Container = styled.div`
.drag {
  top: auto !important;
  left: auto !important;
}
`;
const DroppableWrapper = styled.div``;
const DraggableWrapper = styled.div`
`;
const NoData = styled.div`
margin-top: 10px;
    border-top: 2px solid whitesmoke;
height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ShowMsg = styled.h3`
font-weight: 400;
`;

const CardContainer = styled.div`
margin-top: 10px;
    border-top: 2px solid whitesmoke;
`;

const SeletionLoadingContainer = styled.div`
margin-top: 10px;
    border-top: 2px solid whitesmoke;
`;