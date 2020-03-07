import axios from 'axios';
import React from 'react';
import ChefList from './ChefList';
import RecipeList from './RecipeList';
const { useState, useEffect } = React;

const App = () => {
    const [chefs, setChefs] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        Promise.all([
            axios.get('/api/chefs'),
            axios.get('/api/recipes')
        ])
        .then(responses => responses.map( response => response.data))
        .then( results => {
            setChefs(results[0]);
            setRecipes(results[1]);
        })
        .catch(ex => setError(ex.response.data.message));
    }, []);
    return(
        <div>
            <h2>Acme Bakery</h2>
            <div id = 'listBox'>
                <ChefList chefs = { chefs } setChefs = { setChefs } recipes = { recipes } setRecipes = { setRecipes }/>
                <RecipeList chefs = { chefs } setChefs = { setChefs } recipes = { recipes } setRecipes = { setRecipes }/>
            </div>
        </div>
    );
}

export default App;