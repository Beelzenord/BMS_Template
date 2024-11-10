import { BuildingSpecifier} from '../model/building'
import { v4 as uuidv4 } from 'uuid';


const buildingsSpecList : Array<{ id: string; name: string; temperature: number }> = [];
const mockBuildings : Array<{ id: string; name: string; temperature: number }> = [
    { id: '1', name: 'Building', temperature: 72 },
    { id: '2', name: 'bBuilding', temperature: 71 },
    { id: '3', name: 'bCenter', temperature: 73 },
  ];
export const resolvers = {
    
    Query: {
      //  buildings: () => buildings,
      buildingSpec : () => mockBuildings
    },
    Mutation: {
    
      addBuildingSpec:(_:any, {name: name,temperature}:{name: string; temperature:number}) => {
        const newBuilding = {
            id: uuidv4(),
            name: name,
            temperature
        }
        
        mockBuildings.push(newBuilding);
        return newBuilding;
      },
      updateBuildingSpec:  (_: any, { id, name: name, temperature }: {id:string, name: string; temperature:number}) => {
        console.log('update: ', id);
        const buildingToUpdate = mockBuildings.find(building => building.id === id);
        if (!buildingToUpdate) return null; // TODO: Throw exception

        buildingToUpdate.name = name;
        buildingToUpdate.temperature = temperature;
        //mockBuildings.push(buildingToUpdate);
        return buildingToUpdate;
    },
    deleteBuilding: (_: any, { id }: { id: string }) =>{
      const buildingToDelete = mockBuildings.find(building => building.id === id);
      if (!buildingToDelete) return null;
      //
      const index = mockBuildings.findIndex(building => building.id === id);
      mockBuildings.splice(index, 1);
      return buildingToDelete;
    }
  }
}
  ;