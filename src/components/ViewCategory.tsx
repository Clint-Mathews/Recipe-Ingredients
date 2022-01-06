import React from 'react'
import styled from 'styled-components'
import { Category } from '../models/Category'
import getAPIURL from '../utils/create.url';
import CloseButton from './CloseButton';
function ViewCategory({ categories, updateCategories }: { categories: Category[], updateCategories: (category: string) => void }) {
    const deleteCategory = async (category: string) => {
        const response = await fetch(getAPIURL('getRecipesBasedOnCategory'), {
            body: JSON.stringify({ data: category }),
            method: "POST"
        });
        const data = await response.json();
        console.log(data.data.recipes.values);
        if (data.data.recipes.values.length) {
            console.log('Data exists');
        } else {
            console.log("Data does not exist");
            const response = await fetch(getAPIURL('deleteCategory'), {
                body: JSON.stringify({ data: category }),
                method: "POST"
            });
            const data = await response.json();
            console.log(data);
            updateCategories(category);
        }
    }
    return (
        <CategoryViewContainer>
            {categories.map((item: Category) => {
                return (
                    <SingleCategory key={item.value}>
                        <span> {item.value}</span>
                        <CloseButton deleteCategory={() => deleteCategory(item.value)} />
                    </SingleCategory>)
            })}
        </CategoryViewContainer>
    )
}

export default ViewCategory
const CategoryViewContainer = styled.div`
display: grid;
grid-template-columns: repeat(3, 33.33%);
margin: 10px  0;
;
`;
const SingleCategory = styled.div`
display: flex;
justify-content: space-between;
margin: 10px;
padding: 8px;
align-items: center;
border-radius:5px;
outline: 4px solid #d6fdf9;
transition: outline 0.6s ease-in-out, color 0.4s ease-in-out;

:hover{
color: black;
outline: 4px solid #40e0d0;
}
`;