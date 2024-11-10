import { BaseButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    edit: 'edit',
   
  };

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
    ({
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
     // [BUTTON_TYPE_CLASSES.edit]: GoogleSignInButton,
     // [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

const Button = () =>{
   // const CustomButton = getButton(buttonType);
    return(
            <Button></Button>
    )
}