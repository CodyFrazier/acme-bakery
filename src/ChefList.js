import React from 'react';

const ChefList = ({ chefs, setChefs, recipes, setRecipes }) => {
    return (
        <ul id = 'chefList'>{
            chefs.map((chef, idx) => {
                return (
                    <li id =  {chef.id } key = { idx }>
                        <div className = 'spaceB'>{ chef.name }<input type = 'button' value = 'X'/></div>
                        <ul className = 'chefRecipes'>{
                            recipes.filter(recipe => recipe.chefId === chef.id).map((recipe, idx) => {
                                return (
                                    <li id = { recipe.id } key = { idx }>
                                        <div className = 'spaceB'>{ recipe.name }<input type = 'button' value = 'X' /></div>
                                    </li>
                                )
                            })
                        }</ul>
                    </li>
                )
            })
        }</ul>
    )
} 

export default ChefList;