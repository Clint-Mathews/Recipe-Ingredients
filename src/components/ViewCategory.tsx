import React from 'react'
import styled from 'styled-components'
import { Category } from '../models/Category'
import CloseButton from './CloseButton';
import EditViewInput from './EditViewInput';
import categoryApiService from '../utils/category-api.service'
import toastService, { ToastType } from '../utils/taostService';


function ViewCategory({ categories, deleteUpdateCategories }: { categories: Category[], deleteUpdateCategories: (category: string) => void }) {
    const deleteCategory = async (category: string) => {
        const data = await categoryApiService.getRecipesBasedOnCategory(category);
        if (data.data.recipes.values.length) {
            toastService({ text: "Recipe exists against the category", toastType: ToastType.Error });
        } else {
            const data = await categoryApiService.deleteCategory(category);
            toastService({ text: "Category deleted", toastType: ToastType.Success });
            deleteUpdateCategories(category);
        }
    }
    return (
        <CategoryViewContainer>
            {categories.map((item: Category) => {
                return (
                    <SingleCategory key={item.value}>
                        <EditViewInput item={item} />
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
margin: 8px  0;
;
`;
const SingleCategory = styled.div`
display: flex;
justify-content: space-between;
margin: 10px;
height: 35px;
align-items: center;
border-radius:5px;
border: 1px solid rgb(0 0 0 / 30%) ; 
transition: border 0.6s ease-in-out, color 0.4s ease-in-out;

:hover{
color: black;
border: 1px solid rgb(0 0 0 / 57%) ; 
}
`;