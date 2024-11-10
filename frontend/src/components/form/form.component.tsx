import React, { useState } from 'react';
interface BuildingFormProps {
    initialName: string;
    initialTemperature: number;
    onSubmit: (name: string, temperature: number) => void;
    buttonText: string;
}
const BuildingForm: React.FC<BuildingFormProps> = ({ initialName, initialTemperature, onSubmit, buttonText }) => {
    const [name, setName] = useState(initialName);
    const [temperature, setTemperature] = useState(initialTemperature);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, temperature);
    };

    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Building Name"
            />
            <input 
                value={temperature} 
                onChange={(e) => setTemperature(e.target.valueAsNumber)} 
                required 
                type='number'
            />
            <button type="submit">{buttonText}</button>
        </form>
    );
};

export default BuildingForm;