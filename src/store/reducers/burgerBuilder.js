import * as actionTypes from '../actions/actionTypes'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

function burgerBuilderReducer(state = initState, action) {
  switch (action.type) {
    case (actionTypes.ADD_INGREDIENT): {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    }

    case (actionTypes.REMOVE_INGREDIENT): {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    }

    case (actionTypes.SET_INGREDIENTS): {
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: initState.totalPrice,
        error: null,
        building: false,
      };
    }

    case (actionTypes.FETCH_INGREDIENTS_FAILED): {
      return {
        ...state,
        error: action.error,
      };
    }
    
    default: {
      return state;
    }
  }
}

export default burgerBuilderReducer