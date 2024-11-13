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
export const BUILDING_BY_ID = gql`
  query GetSingle {
  
    buildingSpecById(id: $buildingSpecByIdId) {
     id
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

export const DELETE_BUILDING = gql`
  mutation($id:ID!){
    deleteBuilding(id: $id)
  }
`

