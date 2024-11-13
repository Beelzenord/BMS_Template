import { useState, useContext } from 'react';
import './building-card.styles.css';
import { BuildingsContext } from "../../contexts/building.context";
import BuildingForm from '../form/form.component';
import BuildingDisplay from '../building-card-preview/building-card.preview';
import Button from '../button/button.component';
import Modal from '../modal/modal.component';
import { Building } from '../../contexts/building.context';

const BuildingCard = ({ building }: { building: Building }) => {
    const { name, temperature } = building;
    const [onEditable, setEditable] = useState(false);
    const { deleteBuilding, updateBuilding } = useContext(BuildingsContext)!;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const showModal = (message:string) =>{
        setModalMessage(message);
        setIsModalOpen(true);
    }

    //invoke submit which examines validity of input, and update building which sends data to graphql instance
    const handleUpdate = async (newName: string, newTemperature: number) => {

        updateBuilding(building.id, { name: newName, temperature: newTemperature })
            .then((result) => {
                if (result) {
                    showModal('Building updated successfully');
                } else {
                    showModal('Failed to update building')
                    console.error('Failed to update building');
                }
            })
            .catch((error) => {
                console.error('Error updating building:', error);
                showModal('Error in updating building');
            });

        setEditable(false);
    }
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this building?");
        if (confirmDelete) {
            const result = await deleteBuilding(building.id);
            if (!result) {
                console.error('Error deleting building:');
                showModal('Error in deleting building');
            }
        }
    }
    return (
        <div className='building-card'>
            {!onEditable ? (
                //Alternate the card between display and editable form
                <>
                    <BuildingDisplay
                        name={name}
                        temperature={temperature}
                        onEdit={() => setEditable(true)}
                    />
                </>
            ) :
                (//edit the building card
                    <BuildingForm
                        initialName={name}
                        initialTemperature={temperature}
                        onSubmit={
                            (name, temperature) => {
                                
                                handleUpdate(name, temperature);
                            }}
                        buttonText="Update Building" ></BuildingForm>
                )
            }
            <Button text='Delete' onClick={handleDelete}></Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p className="modal-message">{modalMessage}</p>
            </Modal>
        </div>
    );
}

export default BuildingCard;

