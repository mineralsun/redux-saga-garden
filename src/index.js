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
const startingPlantArray = [];

const plantList = (state = startingPlantArray, action) => {
  switch (action.type) {
    case 'ADD_PLANT':
      // when adding a new plant, use spread operator
      return [ ...state, action.payload ];
      // do NOT use spread operator when setting all plants, just return entire payload
      case 'SET_PLANTS':
        return action.payload;
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
    console.error(`Error in generator fetchPlants`, error)
  }
}

// Takes in an action with a payload and sends that payload
// to the server!
function* sendPlantToServer(action) {
  try {
    yield axios.post('/api/plant', action.payload);
    yield put({ type: 'FETCH_PLANTS' });
  } catch (error) {
    console.log(`Error in addPlant`, error)
    alert('Something went wrong!')
    throw error;
  }
}

function* removePlant(action) {
  try {
    yield axios.delete(`/api/plant/${action.payload}`)
    yield put({ type: 'FETCH_PLANTS'});
  } catch (error) {
  alert('Something went wrong!')
  console.log(`Error in removePlant`)
  throw error;
  }
}

function* rootSaga() {
  // Setup all sagas here (map action type to saga functions)
  yield takeLatest('FETCH_PLANTS', fetchPlants);
  yield takeLatest('REMOVE_PLANT', removePlant);
  yield takeLatest('SEND_PLANT_TO_SERVER', sendPlantToServer);
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