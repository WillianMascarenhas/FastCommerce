import { TextFieldProps } from '@mui/material';
import { forwardRef, InputHTMLAttributes } from 'react';
import { StyledTextField } from '../../../styles/form';
import { StyledParagraph } from '../../../styles/typography';


interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(({error,label,type, ...rest}, ref) => (
    <fieldset>
      <StyledTextField label={label} type={type} ref={ref} {...rest as TextFieldProps}/>
      <StyledParagraph fontColor='red'>{error}</StyledParagraph>
    </fieldset>
  )
)

export default Input; 
