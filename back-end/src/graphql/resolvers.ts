import { Building } from '../model/buildingDTO';
import { InvalidInputValuesError } from '../errors/base-error';
import { validateName, validateTemperature } from '../util/validators';
export const resolvers = {

  Query: {
    buildingSpec: async () => await Building.find(),
    buildingSpecById: async (_: any, { id }: { id: string }) => {
      try {
        const buildingSpec = await Building.findById(id);
        if(!buildingSpec){
          throw new Error("Unable to find Building");
        }
        return buildingSpec;
      } catch (error) {
        console.error(error);
      }
    }},
    Mutation: {

      addBuildingSpec: async (_: any, { name: name, temperature }: { name: string; temperature: number }) => {
       
        if (!validateTemperature(temperature)) {
          throw new InvalidInputValuesError("Invalid temperature");
        }
        if (!validateName(name)) {
          throw new InvalidInputValuesError("Invalid naming");
        }

        const newbuildingDTO = new Building({ name, temperature });
        if(!newbuildingDTO){
          throw new Error("Unable to add Building");
        }
        return await newbuildingDTO.save();
      },
      updateBuildingSpec: async (_: any, { id:id, name: name, temperature }: { id: string, name: string; temperature: number }) => {
        if (!validateTemperature(temperature)) {
          throw new InvalidInputValuesError("Invalid temperature");
        }
        if (!validateName(name)) {
          throw new InvalidInputValuesError("Invalid naming");
        }
        const updatedBuilding = await Building.findByIdAndUpdate(
          id,
          { name, temperature });

          if(!updatedBuilding){
            throw new Error("Unable to update Building");
          }
       
        return updatedBuilding;
      },
      deleteBuilding: async (_: any, { id }: { id: string }) => {
        const deletedBuilding = await Building.findByIdAndDelete(id);
        
        if(!deletedBuilding){
          throw new Error("Unable to update Building");
        }
        return !!deletedBuilding;
      }
    }
  }
