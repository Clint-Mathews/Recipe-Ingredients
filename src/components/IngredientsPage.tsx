import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Ingredient } from '../models/Ingredient';
import Header from '../ui-components/Header';
import IngedientsList from '../ui-components/IngedientsList';
import IngredientModal from '../ui-components/IngredientModal';
import SubHeading from '../ui-components/SubHeading';

function IngredientsPage() {
    const { recipe, recipeName } = useLocation()?.state as any;
    const [addModalOpen, setAddModalOpen] = useState(false);
    const handleOpenIngredientAdd = () => setAddModalOpen(true);
    const handleCloseIngredientAdd = () => setAddModalOpen(false);
    const ingredient: Ingredient = {
        id: 0,
        view_order: 0,
        title: "",
        thumbnail: "",
        description: "",
        recipe_name: ""
    }
    return (
        <Container>
            <Header heading={`Recipe Shop Update`} />
            <IngredientContainer>
                <SubHeaingContainer>
                    <SubHeading heading={`${recipeName} - Ingredients`} />
                    <SubContainer>
                        <AddIngredientBtn onClick={handleOpenIngredientAdd} className={`button ${addModalOpen && 'button-loading'}`}> <span className="button-text">Add Ingredient</span></AddIngredientBtn>
                    </SubContainer>
                </SubHeaingContainer>
                <IngedientsList recipeName={recipe} />
            </IngredientContainer>
            {addModalOpen && <IngredientModal isAdd={true} recipeName={recipe} ingredient={ingredient} open={addModalOpen} handleClose={handleCloseIngredientAdd} />}
        </Container>
    )
}

export default IngredientsPage

const Container = styled.div`

`;
const IngredientContainer = styled.div`
background-color: white;
margin: 20px;
border-radius: 10px;
padding: 20px 20px 20px 25px;
box-shadow: 0 0 25px rgb(0 0 0 / 10%);
:hover{
    box-shadow: 0 0 25px rgb(0 0 0 / 15%);
}
`;

const SubHeaingContainer = styled.div`
display:flex;
    justify-content: space-between;
        align-items: center;
`;

const SubContainer = styled.div`
display: flex;
`;

const AddIngredientBtn = styled.button`
padding: 0 10px 0 10px;
width: auto;
height: 38px;
margin-right: 10px;
position: relative;
margin-left: 10px;
color: white;
background: #0a66c2;
border: 0;
border: 0;
border-radius: 5px;
transition: all 0.2s ease-in-out;
&.cancel{
color: rgba(41, 41, 41, 1);
background: rgb(0 0 0 / 18%)
}

&.button-loading .button-text{
    visibility: hidden;
    opacity:0;
}

&.button-loading::after{
    content:"";
    position: absolute;
    width: 16px;
    height: 16px;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color:white;
    border-radius: 50%;
    animation : button-loading-spinner 1s linear infinite;
}
@keyframes button-loading-spinner {
    from{
        transform: rotate(0turn);
    }
    to{
        transform: rotate(1turn);
    }
}

:hover,:focus,:active{
cursor: pointer;
background:#004c99;
&.cancel{
background: rgb(0 0 0 / 28%)
}
}
`;
