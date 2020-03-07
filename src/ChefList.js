import React from 'react';
import axios from 'axios';

const ChefList = ({ chefs, setChefs, recipes, setRecipes }) => {
    const removeChef = async(chefId) => {
        console.log('id of chef to delete:', chefId);
        await(axios.delete(`api/chefs/${ chefId }`));
        setRecipes(recipes.filter(recipe => recipe.chefId !== chefId));
        setChefs(chefs.filter(chef => chef.id !== chefId));
    };
    return (
        <ul id = 'chefList'>{
            chefs.map((chef, idx) => {
                return (
                    <li id =  {chef.id } key = { idx }>
                        <div className = 'spaceB'>{ chef.name }<input type = 'button' value = 'X' onClick = { ( ev ) => { console.log(ev.target.parentNode); removeChef(ev.target.parentNode.parentNode.id) } }/></div>
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