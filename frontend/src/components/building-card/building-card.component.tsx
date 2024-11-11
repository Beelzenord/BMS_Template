import React, { useState, useContext } from 'react';
import './building-card.styles.css';
import { Building } from '../../contexts/building.context';
import { BuildingsContext } from "../../contexts/building.context";
import BuildingForm from '../form/form.component';
import BuildingDisplay from '../building-card-preview/building-card.preview';
import Button from '../button/button.component';


const BuildingCard = ({ building }: { building: Building }) => {
    const { name, temperature } = building;
    const [onEditable, setEditable] = useState(false);
    const { updateBuilding, deleteBuilding, submitBuilding } = useContext(BuildingsContext)!;


    const handleUpdate = (newName: string, newTemperature: number) => {
        submitBuilding({ name: newName, temperature: newTemperature }, (() => updateBuilding(building.id, { name: newName, temperature: newTemperature })));
        setEditable(false);
    };
    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this building?");
        if (confirmDelete) {
            deleteBuilding(building.id);
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
                        onSubmit={handleUpdate}
                        buttonText="Update Building" ></BuildingForm>
                )
            }
            <Button text='Delete' onClick={handleDelete}></Button>
        </div>
    );
}

export default BuildingCard;

