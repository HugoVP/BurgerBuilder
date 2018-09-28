 import * as actionTypes from './actionTypes'
 
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
   return {
    type: actionTypes.INIT_INGREDIENTS,
   };
 }

 export function fetchIngredientsFailed(error) {
   return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    error,
   };
 }