import { BaseButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  edit: 'edit',
};
interface ActionButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
}[buttonType]);

const Button: React.FC<ActionButtonProps> = ({ ...otherProps }) => {
  return (
    <button {...otherProps}  >
      {otherProps.text}
    </button>
  )
}

export default Button;