import { BuildingSpecifier} from '../model/building'
import { v4 as uuidv4 } from 'uuid';


const buildingsSpecList : Array<{ id: string; buildingName: string; temperature: number }> = [];
const mockBuildings : Array<{ id: string; buildingName: string; temperature: number }> = [
    { id: '1', buildingName: 'Building', temperature: 72 },
    { id: '2', buildingName: 'bBuilding', temperature: 71 },
    { id: '3', buildingName: 'bCenter', temperature: 73 },
  ];
export const resolvers = {
    
    Query: {
      //  buildings: () => buildings,
      buildingSpec : () => mockBuildings
    },
    Mutation: {
    
      addBuildingSpec:(_:any, {buildingName,temperature}:{buildingName: string; temperature:number}) => {
        const newBuilding = {
            id: uuidv4(),
            buildingName,
            temperature
        }
        
        mockBuildings.push(newBuilding);
        return newBuilding;
      },
      updateBuildingSpec:  (_: any, { id, buildingName, temperature }: {id:string, buildingName: string; temperature:number}) => {
        console.log('update: ', id);
        const buildingToUpdate = mockBuildings.find(building => building.id === id);
        if (!buildingToUpdate) return null; // TODO: Throw exception

        buildingToUpdate.buildingName = buildingName;
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