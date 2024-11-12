import { useEffect, useContext, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Button from "../button/button.component";
import { BuildingsContext } from "../../contexts/building.context";
import BuildingCard from "../building-card/building-card.component";
import './buildings.styles.css'
import BuildingForm from "../form/form.component";
import React from 'react';

const Buildings = () => {
  const { buildings, addBuilding, submitBuilding } = useContext(BuildingsContext)!;
  const [newBuilding, setNewBuilding] = useState(false);

  
  const handleCreate = async (name: string, temperature: number) => {
   const result = await submitBuilding({ name: name, temperature: temperature }, (() =>  addBuilding({ name, temperature })));
   
   if(result){
      //TODO:: maybe a popup
   }
   else{
    console.error('Failed to add building');
   }
  }

  useEffect(() => {
  }, [buildings]);

  return (
    <>
      <Fragment>

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