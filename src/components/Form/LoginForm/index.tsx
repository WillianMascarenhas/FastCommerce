/* eslint-disable import/no-extraneous-dependencies */
import { useContext } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from '../Input';
import { StyledButton } from '../../../styles/button';
import { StyledForm } from '../../../styles/form';
import { IRegisterUser } from '../RegisterForm/index'
import { UserContext } from "../../../providers/UserContext";


export type ILoginUser = Omit<IRegisterUser, "name" | "confimPassaword">
 

const schema = yup.object({
  email: yup.string().email("Email invalido, por favor insira um valido.").required("Email obrigatório."),
  password: yup
  .string().
  required("Suas infomaçôes não correspondem, tente novamente.")
  .matches(/.{6,}/, `Suas infomaçôes não correspondem, tente novamente.`),
})

const LoginForm = () => {

  const { register, handleSubmit, formState: {errors} } = useForm<ILoginUser>({
    resolver: yupResolver(schema)
  })

  const { loginUser } = useContext(UserContext)

  const getData = (data: ILoginUser) =>{
    loginUser(data)

  } 
  
  return ( 


  <StyledForm onSubmit={handleSubmit(getData)}>
    <Input error={errors.email?.message} type='email' label='Email' {...register("email")}/>
    <Input error={errors.password?.message} type='password' label='Senha' {...register("password")}/>
    <StyledButton type='submit' $buttonSize='default' $buttonStyle='green'>
      Entrar
    </StyledButton>
  </StyledForm>
);
}

export default LoginForm;
