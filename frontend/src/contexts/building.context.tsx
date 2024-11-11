import { createContext, useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { COLLECTIONS, ADD_NEW_BUILDING, UPDATE_BUILDING, DELETE_BUILDING } from '../utils/graphql.client';

export interface Building {
  id: string;
  name: string;
  temperature: number;
}

interface BuildingsContextType {
  buildings: Building[];
  addBuilding: (building: Omit<Building, 'id'>) => void;
  updateBuilding: (id: string, updates: Partial<Building>) => void;
  deleteBuilding: (id: string) => Boolean;
  submitBuilding: ({ name, temperature }: { name: string, temperature: number }, ...postMethod: any[]) => void;
}
export const BuildingsContext = createContext<BuildingsContextType | undefined>(undefined);

export const BuildingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [buildingSpec, setBuildingsMap] = useState<Building[]>([]);
  const { loading, error, data, refetch } = useQuery(COLLECTIONS);
  const [addBuildingMutation] = useMutation(ADD_NEW_BUILDING);
  const [updateBuildingMutation] = useMutation(UPDATE_BUILDING);
  const [deleteBuildingMutation] = useMutation(DELETE_BUILDING);

  useEffect(() => {
    console.log('graphql ', data);
    if (data) {
      const { buildingSpec } = data;
      console.log('buildingsSpec: ', buildingSpec);
      setBuildingsMap(buildingSpec);
    }
  }, [data]);

  const addBuilding = async (building: Omit<Building, 'id'>) => {
    const newBuilding = { ...building, id: Date.now().toString() };
    console.log('back in context ', newBuilding);
    try {
      await addBuildingMutation({
        variables: {
          name: newBuilding.name,
          temperature: newBuilding.temperature
        }
      });
      await refetch();
    }
    catch (error) {
      console.error('error: ', error);
    }
  }

  const updateBuilding = async (id: string, updates: Partial<Building>) => {

    try {
      console.log('before updating.. ', updates);
      const result = await updateBuildingMutation({
        variables: { id: id, name: updates.name, temperature: updates.temperature }
      });
      await refetch();
      console.log('here is the result');
    }
    catch (error) {
      console.error('error: ', error);
    }
  }

  const deleteBuilding = async (id: string) => {
    try {
      const result = await deleteBuildingMutation({
        variables: { id }
      });
      if(result){
        alert('building deleted');
      }
      await refetch();
    }
    catch (error) {
      console.error('error: ', error);
    }
  }

  const submitBuilding = async ({ name, temperature }: { name: string, temperature: number }, postMethod: (() => void)) => {
    console.log('submit: ', typeof postMethod);
    if (!name) {
      alert("Building Name is required");
      return;
    }
    if (temperature < 0 || temperature > 35) {
      alert("Temperature must be between  0 °C and 35 °C ");
      return;
    }
    postMethod();
  }

  return (
    <BuildingsContext.Provider value={{ buildings: buildingSpec, addBuilding, updateBuilding, deleteBuilding, submitBuilding }}>
      {children}

    </BuildingsContext.Provider>
  );
}