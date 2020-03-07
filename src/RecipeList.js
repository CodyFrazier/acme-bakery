import React from 'react';
import axios from 'axios';

const RecipeList = ({ chefs, setChefs, recipes, setRecipes }) => {
    const removeRecipe = async(recipeId) => {
        console.log('id of recipe to delete:', recipeId);
        await(axios.delete(`api/recipes/${ recipeId }`));
        setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    };
    return (
        <ul id = 'recipeList'>{
            recipes.map((recipe, idx) => {
                return (
                    <li id = { recipe.id } key = { idx } className = 'spaceB'>
                        <span>{ recipe.name } -by { recipe.chefId? chefs.filter(chef => recipe.chefId === chef.id)[0].name : 'No Known Chef' }</span>
                        <input type = 'button' value = 'X' onClick = { (ev) => { removeRecipe(ev.target.parentNode.id) } }/>
                    </li>
                )
            })
        }</ul>
    )
};

export default RecipeList;