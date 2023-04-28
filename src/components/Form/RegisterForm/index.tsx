/* eslint-disable import/no-extraneous-dependencies */
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserContext } from '../../../providers/UserContext';
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';


const schema = yup.object({
  name: yup.string().required("Nome é obrigatório."),
  email: yup.string().email("Email invalido, por favor insira um valido.").required("Email obrigatório."),
  password: yup
  .string().
  required("A senha deve conter pelo menos 6 characters, uma letra, um número e um character especial.")
  .matches(/.{6,}/, `Deve conter pelo menos 6 characters.`),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "A senha deve ser a mesma que a passada anterior mente.").required("Confirmação de senha obrigatória."),
  
})


export interface IRegisterUser {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}


const RegisterForm = () =>{

  const { registerUser } = useContext(UserContext)


  const { register, handleSubmit, formState:{errors}} = useForm<IRegisterUser>({
    resolver: yupResolver(schema), mode:"onSubmit"
  })

  const getData = (data: IRegisterUser) =>{
    registerUser(data)
    // registerUser(data)
    // if(data.password !== data.confimPassaword){
    //   alert("isso vai ser um toast")
    // }else{
    //   // registerUser(data)
    // }
  }

  
 
  return (
    <StyledForm onSubmit={handleSubmit(getData)}>
      <Input error ={errors.name?.message} type='text'  label='Nome:' {... register('name')}/>
      <Input error ={errors.email?.message} type='email' label='Email:' {... register('email')}/>
      <Input error ={errors.password?.message} type='password' label='Senha:' {... register('password')}/>
      <Input error ={errors.confirmPassword?.message} type='password' label='Confimação de senha:' {... register('confirmPassword')}/>
      <StyledButton type='submit' $buttonSize='default' $buttonStyle='gray'>
        Cadastrar
      </StyledButton>
    </StyledForm>
  );
}
export default RegisterForm;
