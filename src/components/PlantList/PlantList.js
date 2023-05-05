import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    const reduxState = useSelector(store => store);

    const plantList = useSelector(store => store.plantList);


    useEffect(() => {
        console.log('component did mount');
        // getPlants();
        // deletePlant();
        // dispatch an action to request the plantList from the API
        dispatch({ type: 'FETCH_PLANTS' });
    }, []); 

    const removePlant = (id) => {
        dispatch({ type: 'REMOVE_PLANT', payload: id });
    }

    return (
        <div>
            <h3>This is the plant list</h3>
            {/* <pre>{JSON.stringify(plantList)}</pre> */}
            <ul>
                {
                    plantList.map(plant => (
                        <div key={plant.id}>
                            <p>{plant.name}</p>
                            <p>{plant.kingdom}</p>
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
