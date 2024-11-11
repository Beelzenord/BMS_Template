export const typeDef = `#graphql
  # Queryable fields
  type BuildingSpec {
    id: ID!
    name: String
    temperature: Int
  }
    type Query {
    buildingSpec: [BuildingSpec]
  }

  type Mutation {
    addBuildingSpec(name: String!, temperature: Int!): BuildingSpec!
    updateBuildingSpec(id:ID!, name: String!, temperature: Int!) : BuildingSpec! 
    deleteBuilding(id: ID!): Boolean!
  }  
  
  
`;

