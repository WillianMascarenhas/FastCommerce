/* eslint-disable arrow-body-style */
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { ILoginUser } from '../components/Form/LoginForm';
import { IRegisterUser } from '../components/Form/RegisterForm';
import { api } from '../services/api';

export type ILoginUser = Omit<IRegisterUser, 'name' | 'confimPassaword'>;

export interface IError {
  error?: string;
}

interface IUserContext {
  login?: ILoginUser[];
  register?: IRegisterUser[];
  registerUser: (data: IRegisterUser) => Promise<void>;
  loginUser: (data: ILoginUser) => Promise<void>;
  users: IUser | undefined;
}

interface IUserProviderProps {
  children: ReactNode;
}

export interface IRoot {
  accessToken: string;
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const Navigate = useNavigate();

  const registerUser = async (data: IRegisterUser) => {
    try {
      const reponse = await api.post('/users', data);
      toast.success('Registro feito com sucesso!');
      Navigate('/');
    } catch (error: IError | any) {
      toast.error(error.response.data);
    }
  };

  const [users, setUser] = useState<IUser>();

  const loginUser = async (data: ILoginUser) => {
    try {
      const reponse = await api.post('/login', data);
      setUser(reponse.data.user);
      toast.success('Login efetuado com sucesso!');
      localStorage.setItem('@KBTOKEN', reponse.data.accessToken);
      localStorage.setItem('@KBUSERID', reponse.data.user.id);
      Navigate('/shop');
    } catch (error: IError | any) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const teste = async () => {
      const autoLoginUser = async () => {
        try {
          const token = localStorage.getItem('@KBTOKEN');
          const userID = localStorage.getItem('@KBUSERID');
          const reponse = await api.get(`/users/${userID}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(reponse.data);
          Navigate('/shop');
        } catch (error: IError | any) {
          console.error(error);
          localStorage.removeItem('@KBTOKEN');
          localStorage.removeItem('@KBUSERID');
        }
      };
      await autoLoginUser();
    };
    teste();
  }, []);

  return (
    <UserContext.Provider value={{ registerUser, loginUser, users }}>
      {children}
    </UserContext.Provider>
  );
};
