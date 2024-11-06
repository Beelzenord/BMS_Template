import { BuildingSpecifier} from '../model/building'
import { v4 as uuidv4 } from 'uuid';


const buildingsSpecList : Array<{ id: string; buildingName: string; temperature: number }> = [];

export const resolvers = {
    Query: {
      //  buildings: () => buildings,
      buildingSpec : () => buildingsSpecList,
    },
    Mutation: {
    
      addBuildingSpec:(_:any, {buildingName,temperature}:{buildingName: string; temperature:number}) => {
        const newBuilding = {
            id: uuidv4(),
            buildingName,
            temperature
        }
        buildingsSpecList.push(newBuilding);
        return newBuilding;
      }
    }
  };