import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import App from './App';
import axios from 'axios';
import { takeLatest, put } from 'redux-saga/effects';

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      return [ ...state, action.payload ]
    default:
      return state;
  }
};

function* fetchPlants() {
  try {
    const response = yield axios.get('/api/plant');
    const action = { type: 'SET_PLANTS', payload: response.data }
    // Put is the SAME as dispatch
    yield put(action);
  } catch (error) {
    console.log(`Error in generator fetchPlants`, error)
  }
}

function* postPlant(action){
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS'});
    // action.setPlant('');
  } catch (error) {
    console.log(`Error in postPlant ${error}`);
    alert('Something went wrong!')
  }
}

function* deletePlant(action){
  try {
    yield axios.delete('/api/plant/:id', action.payload);
    yield put ({ type: 'FETCH_PLANTS'});
  } catch (error) {
    console.log(`Error in deletePlant ${error}`);
    alert('Something went wrong!');
  }

}

function* rootSaga() {
  // Setup all sagas here (map action type to saga functions)
  yield takeLatest('DELETE_PLANT', deletePlant);
  yield takeLatest('FETCH_PLANTS', fetchPlants);
  yield takeLatest('ADD_PLANT', postPlant);
}
//Step 4
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({ 
    plantList
   }),
   // Step 5
   applyMiddleware(sagaMiddleware, logger)
);
//Step 6
sagaMiddleware.run(rootSaga);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);