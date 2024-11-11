import { createContext, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { COLLECTIONS, ADD_NEW_BUILDING, UPDATE_BUILDING, DELETE_BUILDING } from '../utils/graphql.client';

export interface Building {
  id: string;
  name: string;
  temperature: number;
}

interface BuildingsContextType {
  buildings: Building[];
  addBuilding: (building: Omit<Building, 'id'>) => Promise<boolean>;
  updateBuilding: (id: string, updates: Partial<Building>) => Promise<boolean>;
  deleteBuilding: (id: string) => Promise<boolean>;
  submitBuilding: ({ name, temperature }: { name: string, temperature: number }, ...postMethod: any[]) => Promise<boolean>;
}
export const BuildingsContext = createContext<BuildingsContextType | undefined>(undefined);

export const BuildingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [buildingSpec, setBuildingsMap] = useState<Building[]>([]);
  const { loading, error, data, refetch } = useQuery(COLLECTIONS);
  const [addBuildingMutation] = useMutation(ADD_NEW_BUILDING);
  const [updateBuildingMutation] = useMutation(UPDATE_BUILDING);
  const [deleteBuildingMutation] = useMutation(DELETE_BUILDING);

  useEffect(() => {
    if (data) {
      const { buildingSpec } = data;
      setBuildingsMap(buildingSpec);
    }
  }, [data]);

  const addBuilding = async (building: Omit<Building, 'id'>): Promise<boolean> => {
    const newBuilding = { ...building, id: Date.now().toString() };
    console.log('back in context ', newBuilding);
    try {
      const result = await addBuildingMutation({
        variables: {
          name: newBuilding.name,
          temperature: newBuilding.temperature
        }
      });
      if (result && result.data && result.data.addBuildingSpec) {
        const { addBuildingSpec } = result.data;
        console.log('RESULT: ', addBuildingSpec);
        await refetch();
        return true;
      } else {
        console.error('No addBuildingSpec found in result');
        return false; // Added return statement here
      }
    }
    catch (error) {
      console.error('error: ', error);
      return false;
    }
  }

  const updateBuilding = async (id: string, updates: Partial<Building>): Promise<boolean> => {

    try {
      console.log('before updating.. ', updates);
      const result = await updateBuildingMutation({
        variables: { id: id, name: updates.name, temperature: updates.temperature }
      });
      await refetch();
      
      const { updateBuildingSpec } = result.data;
      console.log('updated: ', updateBuildingSpec);
      const updatedId : string = updateBuildingSpec.id
      if(updatedId === id){
        await refetch();
        console.log('returning true');
        return true;
      }
      else{
        return false;
    }
  }
    catch (error) {
      console.error('error: ', error);
      return false;
    }
  }

  const deleteBuilding = async (id: string):Promise<boolean> => {
    try {
      const result = await deleteBuildingMutation({
        variables: { id }
      });
      if(result){
        alert('building deleted');
      }
      await refetch();
      return true;
    }
    catch (error) {
      console.error('error: ', error);
      return false;
    }
  }
//event: React.FormEvent<HTMLFormElement>,
  const submitBuilding = async ({ name, temperature }: { name: string, temperature: number }, postMethod: (() => Promise<boolean>)): Promise<boolean> => {
   // event.preventDefault();
    console.log('submit: ', typeof postMethod);
    if (!name) {
      alert("Building Name is required");
      return false;
    }
    if (temperature < 0 || temperature > 35) {
      alert("Temperature must be between  0 °C and 35 °C ");
      return false;
    }
    //return true;
    //console.log('await: ');
  //  return true;
    return await postMethod();
  }

  return (
    <BuildingsContext.Provider value={{ buildings: buildingSpec, addBuilding, updateBuilding, deleteBuilding, submitBuilding }}>
      {children}
    </BuildingsContext.Provider>
  );
}