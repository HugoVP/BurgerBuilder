import { put } from 'redux-saga/effects';

import axios from '../../axios-orders'
import { fetchIngredientsFailed, setIngredients } from '../actions';

export function* initIngredientsSaga() {
  try {
    const response = yield axios.get('/ingredients.json');
    yield put(setIngredients(response.data));
  } catch (error) {
    yield put(fetchIngredientsFailed(error));
  }
}