
export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  edit: 'edit',
};
interface ActionButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}


//Recyclable bitton
const Button: React.FC<ActionButtonProps> = ({ ...otherProps }) => {
  return (
    <button {...otherProps}  >
      {otherProps.text}
    </button>
  )
}

export default Button;