import { v4 as uuidv4 } from 'uuid';
import { Building,IBuilding } from '../model/buildingDTO'; 
import {  InvalidInputValuesError } from '../errors/base-error';
import { validateName, validateTemperature } from '../util/validators';
export const resolvers = {
    
    Query: {
      buildingSpec : async() =>  await Building.find(),
    },
    Mutation: {
    
      addBuildingSpec: async (_:any, {name: name,temperature}:{name: string; temperature:number}) => {
        if(!validateTemperature(temperature)){
          throw new InvalidInputValuesError("Invalid temperature" );
      }
      if(!validateName(name)){
        throw new InvalidInputValuesError("Invalid naming" );
      }
        
        const newBuilding = {
            id: uuidv4(),
            name: name,
            temperature
        }
        const newbuildingDTO = new Building({ name, temperature });
        return await newbuildingDTO.save();
      },
      updateBuildingSpec: async (_: any, { id, name: name, temperature }: {id:string, name: string; temperature:number}) => {
      if(!validateTemperature(temperature)){
          throw new InvalidInputValuesError("Invalid temperature" );
      }
      if(!validateName(name)){
        throw new InvalidInputValuesError("Invalid naming" );
      }
      const updatedBuilding = await Building.findByIdAndUpdate(
          id,
          { name, temperature }
           // Option to return the updated document
        );
        return updatedBuilding;
    },
    deleteBuilding: async (_: any, { id }: { id: string }) =>{
      const deletedBuilding = await Building.findByIdAndDelete(id);
      return !!deletedBuilding;
    }
  }
}
  ;