import { InvalidInputValuesError } from "../errors/invalid-input-error";

export const validateTemperature = (temperature: number) => {
    if (temperature < 0 || temperature > 35) {
        return false;
    }
    return true;
};

export const validateName = (name: string) => {
    if (!name || name.trim() === "") { 
       return false;
    }
    return true;
};

export const validateInput = (name:string, temperature:number)=>{
    validateName(name) && validateTemperature(temperature);
}


