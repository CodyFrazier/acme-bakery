import React from 'react';

const RecipeList = ({ chefs, setChefs, recipes, setRecipes }) => {
    return (
        <ul id = 'recipeList'>{
            recipes.map((recipe, idx) => {
                return (
                    <li id = { recipe.id } key = { idx } className = 'spaceB'>
                        <span>{ recipe.name } -by { recipe.chefId? chefs.filter(chef => recipe.chefId === chef.id)[0].name : 'No Known Chef' }</span>
                        <input type = 'button' value = 'X' />
                    </li>
                )
            })
        }</ul>
    )
};

export default RecipeList;