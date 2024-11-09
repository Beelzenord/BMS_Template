import {createContext,useState, useEffect} from 'react';
import { gql,useQuery,useMutation } from '@apollo/client';
import React from 'react';
const COLLECTIONS = gql`
  query GetCollections {
  
  buildingSpec {
    id
    buildingName
    temperature
  }

  }
`

const ADD_NEW_BUILDING = gql`
  mutation($buildingName: String!, $temperature: Int!){
 
    addBuildingSpec(buildingName: $buildingName, temperature: $temperature) {
      buildingName
      temperature
 }
}
`

const UPDATE_BUILDING = gql`
  mutation ($id: ID!, $buildingName: String, $temperature: Int) {
    updateBuildingSpec(id: $id, buildingName: $buildingName, temperature: $temperature) {
      id
      buildingName
      temperature
    }
  }
`;



interface Building {
    id: string;
    name: string;
    temperature: number;
}

interface BuildingsContextType {
    buildings: Building[];
    addBuilding: (building: Omit<Building, 'id'>) => void;
    updateBuilding: (id: string, updates: Partial<Building>) => void;
    //deleteBuilding: (id: string) => void;
  /*  
 buildingSpec {
    id
    buildingName
    temperature
  }

    */
  }
export const BuildingsContext = createContext<BuildingsContextType | undefined>(undefined);


  /*useMutation(ADD_NEW_BUILDING, {
    variables:{
      buildingName: 'newBuilding.name',
      temperature: newBuilding.temperature
    }
  });*/
  /**
   * const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    }
  });
   */
 // setBuildings(prevBuildings => [...prevBuildings, newBuilding]);
 //BuildingsProvider({ children }: { children: React.ReactNode } 
export const BuildingsProvider = ({children}: {children: React.ReactNode}) => {
    const [buildingSpec, setBuildingsMap] = useState<Building[]>([]);
    const {loading, error, data} = useQuery(COLLECTIONS);
    const [addBuildingMutation] =  useMutation(ADD_NEW_BUILDING);
    const [updateBuildingMutation] = useMutation(UPDATE_BUILDING);
    useEffect(() => {
        console.log('graphql ',data);
        if(data){
          const {buildingSpec}  = data;
          console.log('buildingsSpec: ', buildingSpec);
          setBuildingsMap(buildingSpec);
        }
        
        
      }, [data]);

      const addBuilding = async (building: Omit<Building, 'id'>) => {
        const newBuilding = { ...building, id: Date.now().toString() };
        console.log('back in context ', newBuilding);
        try{
            await addBuildingMutation({
                variables:{
                  buildingName: newBuilding.name,
                  temperature: newBuilding.temperature
                }
            })
        }
        catch(error){
          console.error('error: ',error);
      }
    }

    const updateBuilding = async(id: string, updates: Partial<Building>)=> {
        updates.name = 'updated name';
        console.log('inside updated.', updates);
      
      try{
        const result = await updateBuildingMutation({
        //  variables: { id, ...updates }
          variables:{id:id,something:'her',buildingName:updates.name,temperature:updates.temperature}
        });
        console.log('here is the result');
        }
        catch(error){
          console.error('error: ', error);
        }
    }
    
    
    return (
        <BuildingsContext.Provider   value={{ buildings: buildingSpec, addBuilding, updateBuilding }}>
           {children}
           
        </BuildingsContext.Provider>
      );
}