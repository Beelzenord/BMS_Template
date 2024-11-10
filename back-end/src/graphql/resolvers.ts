import { BuildingSpecifier} from '../model/building'
import { v4 as uuidv4 } from 'uuid';
import { Building,IBuilding } from '../model/buildingDTO'; 


export const resolvers = {
    
    Query: {
      //  buildings: () => buildings,
      buildingSpec : async() =>  await Building.find(),
    },
    Mutation: {
    
      addBuildingSpec: async (_:any, {name: name,temperature}:{name: string; temperature:number}) => {
        const newBuilding = {
            id: uuidv4(),
            name: name,
            temperature
        }
        //add to mongoDB
       
        const newbuildingDTO = new Building({ name, temperature });
        return await newbuildingDTO.save();
        //return newBuilding;
      },
      updateBuildingSpec: async (_: any, { id, name: name, temperature }: {id:string, name: string; temperature:number}) => {
        /*console.log('update: ', id);
        const buildingToUpdate = mockBuildings.find(building => building.id === id);
        if (!buildingToUpdate) return null; // TODO: Throw exception
        
        buildingToUpdate.name = name;
        buildingToUpdate.temperature = temperature;
        //mockBuildings.push(buildingToUpdate);*/
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