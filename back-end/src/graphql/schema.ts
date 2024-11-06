export const typeDef = `#graphql
  # Queryable fields
  type BuildingSpec {
    id: ID!
    buildingName: String
    temperature: Int
  }
    type Query {
    buildingSpec: [BuildingSpec]
  }

  type Mutation {
    addBuildingSpec(buildingName: String!, temperature: Int!): BuildingSpec!
  }  
`;

