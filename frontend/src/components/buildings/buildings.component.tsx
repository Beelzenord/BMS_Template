import { useEffect,useContext,useState } from "react";
import { Fragment } from "react/jsx-runtime";
import React from "react";
import { BuildingsContext } from "../../contexts/building.context";

const Buildings = () => {
   const {buildings,addBuilding,updateBuilding} = useContext(BuildingsContext)!;
  // const [buildings,setBuildings] = useState();
   // const  context  = useContext(BuildingsContext);
    console.log('context goes here', buildings);
    useEffect(() => {

        console.log('hello: heres ', buildings);
      }, [buildings]);
     
    //hmr update /src/components/buildings/buildings.component.tsx (x6)

    return(
        <>
        <Fragment>
           We are the buildings dfd 
           <button onClick={()=>addBuilding({ name: '', temperature: 0 })}>Add New Building</button>
           <button onClick={()=>updateBuilding('1',{ name: 'updated', temperature: 0 })}>Updated Building</button>
           
            
            <div>{
                buildings?.map((building)=>(
                  
                  <div key={building.id}>
                    { 
                    
                    building.buildingName}
                    </div>
                ))
           }
           </div>
        </Fragment>
        
        </>
    )
}
export default Buildings;