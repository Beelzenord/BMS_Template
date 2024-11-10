import React, { useState,useContext } from 'react';
import './building-card.styles.css';
import { Building } from '../../contexts/building.context';
import { BuildingsContext } from "../../contexts/building.context";
import BuildingForm from '../form/form.component';
const BuildingCard = ({building } : {building: Building}) => {
    const { name, temperature } = building;
    const [onEditable,setEditable] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newTemperature, setNewTemperature] = useState(temperature);
 
    const {updateBuilding}= useContext(BuildingsContext)!;
    const handleUpdate = (newName: string, newTemperature: number) => {
        updateBuilding(building.id, { name: newName, temperature: newTemperature });
        setEditable(false);
    };
    //{ name: 'updated', temperature: 0 }
    /**
     * 
     * <input defaultValue={name}  required/>
                    <input defaultValue={temperature} required/>
                    <button onClick={()=>updateBuilding(building.id,{name:building.name,temperature:building.temperature})}> Update Building</button>
                    <button onClick={() => setEditable(false)}>Cancel Edit</button>
     */
    return (
               <div className='building-card'> 
               {!onEditable ? (
                <>
                    <label>{name}</label>
                    <label>Temperature : {temperature} ° C</label>
                    <button onClick={()=>setEditable(true)}>Edit</button>
                </>
               ):
               (
                <BuildingForm  
                initialName={name} 
                initialTemperature={temperature} 
                onSubmit={handleUpdate} 
                buttonText="Update Building" ></BuildingForm>
               )
                }
                </div>
    );
}

export default BuildingCard;

/**
 * 
 * 
 * <input 
                        value={newName}
                        defaultValue={name} 
                        onChange={(e) => setNewName(e.target.value)} 
                        required 
                    />
                     <input 
                        value={newTemperature} 
                        defaultValue={temperature}
                        onChange={(e) => setNewTemperature(e.target.valueAsNumber)} 
                        type='number'
                        required 
                    />
                    <button onClick={()=>
                    {updateBuilding(building.id,{name:newName,temperature:newTemperature}),
                    setEditable(false)}}> Update Building</button>
                    <button onClick={() => setEditable(false)}>Cancel Edit</button>
 */