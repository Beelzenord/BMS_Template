import  { useState, useContext } from 'react';
import './building-card.styles.css';
import { Building } from '../../contexts/building.context';
import { BuildingsContext } from "../../contexts/building.context";
import BuildingForm from '../form/form.component';
import BuildingDisplay from '../building-card-preview/building-card.preview';
import Button from '../button/button.component';
import React from 'react';

const BuildingCard = ({ building }: { building: Building }) => {
    const { name, temperature } = building;
    const [onEditable, setEditable] = useState(false);
    const { updateBuilding, deleteBuilding, submitBuilding } = useContext(BuildingsContext)!;


    const handleUpdate = async (newName: string, newTemperature: number) => {
        const result = await submitBuilding({ name: newName, temperature: newTemperature }, 
            ()=>{
                updateBuilding(building.id, { name: newName, temperature: newTemperature })   
            });
        if(result){
            //TODO:: maybe a popup
            console.log('success');
         }
         else{
          console.error('Failed to add building');
         }
        setEditable(false);
    }
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this building?");
        if (confirmDelete) {
          await deleteBuilding(building.id);
        }
    }
    return (
        <div className='building-card'>
            {!onEditable ? (
                <>
                    <BuildingDisplay
                        name={name}
                        temperature={temperature}
                        onEdit={() => setEditable(true)}
                    />
                </>
            ) :
                (
                    <BuildingForm
                        initialName={name}
                        initialTemperature={temperature}
                        onSubmit={
                             (name, temperature) => {
                            // Update the building with an object containing both name and temperature
                            handleUpdate( name, temperature );
                        }}
                        buttonText="Update Building" ></BuildingForm>
                )
            }
            <Button text='Delete' onClick={handleDelete}></Button>
        </div>
    );
}

export default BuildingCard;

