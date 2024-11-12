import { screen, render,fireEvent,waitFor } from "@testing-library/react";
import App from "../App";
import { MockedProvider } from '@apollo/client/testing';
import { ADD_NEW_BUILDING,UPDATE_BUILDING,COLLECTIONS,DELETE_BUILDING } from "../utils/graphql.client";
import { useEffect, useState } from "react";
import Buildings from "../components/buildings/buildings.component"; 
import { client } from '../App';
import { Building } from "../contexts/building.context";
import { useMutation } from "@apollo/client";
import { BuildingsProvider,BuildingsContext } from "../contexts/building.context";

const mocks = [
  {
    request: {
      query: ADD_NEW_BUILDING,
      variables: { name: 'Building A', temperature: 25 },
    },
    result: {
      data: {
        addBuildingSpec: { id: '1', name: 'Building A', temperature: 25 },
      },
    },
  },
  {
    request: {
      query: UPDATE_BUILDING,
      variables: { id: '1', name: 'Building B', temperature: 30 },
    },
    result: {
      data: {
        updateBuildingSpec: { id: '1', name: 'Building B', temperature: 30 },
      },
    },
  },
  {
    request: {
      query: DELETE_BUILDING,
      variables: { id: '1' },
    },
    result: {
      data: {
        deleteBuildingSpec: { id: '1' },
      },
    },
  },
];


vi.mock('../App', () => ({
    client: {
      mutate: vi.fn(),
    },
}));


describe('AddBuilding Component', () => {
    it('should add a new building', async () => {
      const mocks = [
        {
          request: {
            query: ADD_NEW_BUILDING,
            variables: { name: 'Test Building', temperature: 72.5 },
          },
          result: {
            data: {
              addBuilding: { id: '1', name: 'Test Building', temperature: 72.5 },
            },
          },
        },
      ];
  
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Buildings />
        </MockedProvider>
      );
  
      fireEvent.change(screen.getByPlaceholderText('Building Name'), {
        target: { value: 'Test Building' },
      });
      fireEvent.change(screen.getByPlaceholderText('Temperature'), {
        target: { value: '72.5' },
      });
  
      fireEvent.click(screen.getByText('Add Building'));
  
      await waitFor(() => {
        expect(screen.getByText('Added building: Test Building')).toBeInTheDocument();
      });
    });});
describe("App tests", () => {
    it("should render the title", () => {
    render("<App />");
});
});

/**"types": ["vitest/globals", "@testing-library/jest-dom"] */