import { useEffect, useContext, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Button from "../../components/button/button.component";
import { BuildingsContext } from "../../contexts/building.context";
import BuildingCard from "../../components/building-card/building-card.component";
import './buildings.styles.css'
import BuildingForm from "../../components/form/form.component";
import Modal from "../../components/modal/modal.component";
const Buildings = () => {
  const { buildings, addBuilding, submitBuilding, updateBuilding } = useContext(BuildingsContext)!;
  const [newBuilding, setNewBuilding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleCreate = async (name: string, temperature: number) => {
    const validateInput = await submitBuilding({ name: name, temperature: temperature });//, (() =>  addBuilding({ name, temperature })));

    if (validateInput) {
      const result = await addBuilding({ name, temperature })
      if (result) {
        setModalMessage('Building added successfully');
        setIsModalOpen(true);
      }
      else {
        setModalMessage('Building failed to be added');
        setIsModalOpen(true);
      }
    }
    else {
      console.error('Failed to add building');
      setModalMessage('Building failed to be added');
      setIsModalOpen(true);
    }
  }

  useEffect(() => {
  }, [buildings]);

  return (
    <>
      <Fragment>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <p className="modal-message">{modalMessage}</p>
        </Modal>
        <div className="buildings-container">
          {
            //Option to create new building 
            newBuilding ? (
              <div>Make new building
                <BuildingForm
                  initialName=""
                  initialTemperature={0}
                  onSubmit={
                    (name, temperature) => {
                      handleCreate
                        (name, temperature);
                      setNewBuilding(false);
                    }}
                  buttonText="Create Building"
                />
              </div>
            ) :
              (
                <Button
                  text="Add New Building"
                  onClick={() => setNewBuilding(true)}
                />
              )}

          {

            buildings?.map((building) => (
              <BuildingCard key={building.id} building={building} />
            ))
          }
        </div>
      </Fragment>

    </>
  )
}
export default Buildings;