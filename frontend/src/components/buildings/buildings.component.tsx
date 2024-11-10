import { useEffect,useContext,useState } from "react";
import { Fragment } from "react/jsx-runtime";
import React from "react";
import { BuildingsContext } from "../../contexts/building.context";
import BuildingCard from "../building-card/building-card.component";
import './buildings.styles.css'
import BuildingForm from "../form/form.component";

const Buildings = () => {
   const {buildings,addBuilding} = useContext(BuildingsContext)!;
   const [newBuilding,setNewBuilidng] = useState(false); 
   
   const handleCreate = (name:string,temperature:number) =>{
    console.log('create new building');
    addBuilding({name,temperature});
   }
   // const [buildings,setBuildings] = useState();
   // const  context  = useContext(BuildingsContext);

   /**
    * <div key={building.id}>
                    { 
                    
                      building.name
           <button onClick={()=>updateBuilding('1',{ name: 'updated', temperature: 0 })}>Updated Building</button>
                    
                    }
                    </div>
    
    <button onClick={()=>addBuilding({ name: 'test', temperature: 0 })}>Add New Building</button>
                    */
    console.log('context goes here', buildings);
    useEffect(() => {

        console.log('hello: heres ', buildings);
      }, [buildings]);
     
    return(
        <>
        <Fragment>
           We are the buildings dfd 
           <button onClick={()=>setNewBuilidng(true)}>Add New Building</button>
           { newBuilding ? (
            <div>Make new building
                <BuildingForm 
                    initialName="" 
                    initialTemperature= {0} 
                    onSubmit={handleCreate} 
                    buttonText="Create Building" 
                />
            </div>
          ) :
            <div>dont make new building</div>}
         
            <div className="buildings-container">{
              
                buildings?.map((building)=>(
                  
                 <BuildingCard key={building.id} building={building}/>
                ))
           }
           </div>
        </Fragment>
        
        </>
    )
}
export default Buildings;