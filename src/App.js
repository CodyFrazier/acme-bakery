import axios from 'axios';
import React from 'react';
import { Z_STREAM_ERROR } from 'zlib';
const { useState, useEffect } = React;

const App = () => {
    const [chefs, setChefs] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    /*
     useEffect(()=> {
    Promise.all([
      axios.get('/api/users'),
      axios.get('/api/things'),
      axios.get('/api/user_things'),
    ])
    .then( responses => responses.map( response => response.data))
    .then( results => {
      setUsers(results[0]);
      setThings(results[1]);
      setUserThings(results[2]);
      setError('');
    })
    .catch(ex => setError(ex.response.data.message));
  }, []);
    */
    useEffect(() => {
        Promise.all([
            axios.get('/api/chefs'),
            axios.get('/api/recipes')
        ])
        .then(responses => responses.map( response => response.data))
        .then( results => {
            console.log('about to set...');
            setChefs(results[0]);
            setRecipes(results[1]);
            console.log('chef:', chefs);
            console.log('recipes:', recipes);
        })
        .catch(ex => setError(ex.response.data.message));
    }, []);
    return(
        <div>
            <h2>Acme Bakery</h2>
            <div id = 'listBox'>
                <ul id = 'chefList'>{
                    chefs.map((chef, idx) => {
                        return (
                            <li id =  {chef.id } key = { idx }>
                                <div>{ chef.name }</div>
                                <input type = 'button' value = 'X'/>
                                <ul className = 'chefRecipes'>{
                                    recipes.filter(recipe => recipe.chefId === chef.id).map((recipe, idx) => {
                                        return (
                                            <li id = { recipe.id } key = { idx }>
                                                <div>{ recipe.name }</div>
                                                <input type = 'button' value = 'X' />
                                            </li>
                                        )
                                    })
                                }</ul>
                            </li>
                        )
                    })
                }</ul>
                <ul id = 'recipeList'>{
                    recipes.map((recipe, idx) => {
                        return (
                            <li id = { recipe.id } key = { idx }>
                                <span>{ recipe.name } -by { recipe.chefId? chefs.filter(chef => recipe.chefId === chef.id)[0].name : 'No Known Chef' }</span>
                                <input type = 'button' value = 'X' />
                            </li>
                        )
                    })
                }</ul>
            </div>
        </div>
    );
}

export default App;