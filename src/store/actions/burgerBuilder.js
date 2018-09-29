import * as actionTypes from './actionTypes';
import axios from 'axios';

export function addIngredient(ingredientName) {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
  };
}

export function removeIngredient(ingredientName) {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName,
  };
}

export function setIngredients(ingredients) {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
}

export function asyncSetIngredients() {
  return dispatch => {
    axios
      .get('/api/ingredients')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed(error));
      });
  };
}

export function fetchIngredientsFailed(error) {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error,
  };
}
