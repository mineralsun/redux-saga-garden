import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const plants = useSelector(store => store.plantList);

    const getPlants = () => {
        dispatch({ type: 'FETCH_PLANTS'})
    }

    const deletePlant = () => {
        dispatch({ type: 'DELETE_PLANT'})
    }

    useEffect(() => {
        console.log('component did mount');
        getPlants();
        deletePlant();
        // dispatch an action to request the plantList from the API
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <ul>
                {
                    plants.map(plant => (
                        <li key={plant.id}>
                            {plant}
                        </li>
                    ))
                }
                </ul>
        </div>
    );
}

export default PlantList;
