import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);

    const plantList = useSelector(store => store.plantList);



    const getPlants = () => {
        dispatch({ type: 'FETCH_PLANTS'})
    }

    const deletePlant = () => {
        dispatch({ type: 'DELETE_PLANT'})
    }

    useEffect(() => {
        console.log('component did mount');
        // getPlants();
        // deletePlant();
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' });
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(plantList)}</pre>
            <ul>
                {
                    plantList.map(plant => (
                        <div>
                            {plant.name}
                            <button onClick={() => removePlant(plant.id)}>
                                Remove
                            </button>
                        </div>
                    ))
                }
                </ul>
        </div>
    );
}

export default PlantList;
