import { gql } from "@apollo/client";

export const COLLECTIONS = gql`
  query GetCollections {
  
  buildingSpec {
    id
    name
    temperature
  }

  }
`

export const ADD_NEW_BUILDING = gql`
  mutation($name: String!, $temperature: Int!){
 
    addBuildingSpec(name: $name, temperature: $temperature) {
      name
      temperature
 }
}
`

export const UPDATE_BUILDING = gql`
  mutation ($id: ID!, $name: String!, $temperature: Int!) {
    updateBuildingSpec(id: $id, name: $name, temperature: $temperature) {
      id
      name
      temperature
    }
  }
`;
/**
 *  updateBuildingSpec(id: $updateBuildingSpecId, name: $name, temperature: $temperature) {
    id
    name
    temperature
  }
 */
export const DELETE_BUILDING = gql`
  mutation($id:ID!){
    deleteBuilding(id: $id)
  }
`

/**
 * updateBuildingSpec(id: $updateBuildingSpecId, buildingName:$buildingName, temperature: $temperature) {
    id
    buildingName
    temperature
  }
 */
