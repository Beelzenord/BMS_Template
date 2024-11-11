import React, { useState } from 'react';
import Button from '../button/button.component';

interface BuildingFormProps {
    initialName: string;
    initialTemperature: number;
    onSubmit: (name: string, temperature: number) => void;
    buttonText: string;
}
const BuildingForm: React.FC<BuildingFormProps> = ({ initialName, initialTemperature, onSubmit, buttonText }) => {
    const [name, setName] = useState(initialName);
    const [temperature, setTemperature] = useState(initialTemperature);

    return (
        <form>
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
                min={0}
                max={35}
                type='number'
            />
            <Button text={buttonText} onClick={() => onSubmit(name, temperature)} />

        </form>
    );
};
export default BuildingForm;