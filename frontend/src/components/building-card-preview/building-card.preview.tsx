interface BuildingDisplayProps {
    name: string;
    temperature: number;
    onEdit: () => void;
}

const BuildingDisplay: React.FC<BuildingDisplayProps> = ( {name,temperature,onEdit} ) => {
    return (
        <>
            <label>{name}</label>
            <label>Temperature : {temperature} ° C</label>
            <button onClick={onEdit}>Edit</button>
        </>
    );
};
export default BuildingDisplay;
