BMS template

Frontend-uses vitejs build tool to support development in react tsx. The app contains an apollo client to reach the backend and streams CRUD operations downstream to a couple React child components with the help of the 'Buildings' 
provider context. The 'building' route simply shows cards representing named buildings and their corresponding temperatures.

The building's temperature are supposed to be 'reasonable' with temperatures unable to be outside of 
the intervall between 0 C and 35 C. The backend has some custom error checks to enforce this as well.

The data persists to a mongodb storage whereby a connection of it is established by the nodejs in the backend, which also hosts apollo server and it's data is carried to and fro between the apollo client and itself. The nodejs defines the schema and resolvers of the graphql instance.

Testing the apollo server can be done alone without the frontend by simple using the backend and using the (adjustable) default port of 4000.


To launch.

Set up a mongodb server, use default port or make adjustments in the .env file in the backend.

/backend
(see to it that node and npm is already installed)
-npm install
-npm run dev

/frontend
-npm install
-npm run dev


