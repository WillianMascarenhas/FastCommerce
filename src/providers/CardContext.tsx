import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from './UserContext';
import { api } from '../services/api';

interface IError {
  error?: string;
}

interface ICardContext {
  openCloseModal: boolean;
  setOpenCloseModal: any;
  products: IProduct[];
  setProductToCart: any;
  productToCart?: IProduct;
  arrCart: IProduct[]
  filterProductToCart: () => void
  logoutUser: ()=> void
  removeAllProducts: () => void
}

interface IProduct {
  category: string;
  id: number;
  img: string;
  name: string;
  price: number;
} 

interface ICardProviderProps {
  children: ReactNode;
}

export const CardContext = createContext({} as ICardContext);

export const CardProvider = ({ children }: ICardProviderProps) => {
  const [openCloseModal, setOpenCloseModal] = useState(false);

  const [products, setProducts] = useState([]);

  const token = localStorage.getItem('@KBTOKEN');

  useEffect(() => {
    const productList = async () => {
      try {
        const reponse = await api.get('/products', {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(reponse.data);
      } catch (error: IError | any) {
        toast.error(error.response);
      }
    };
    productList();
  }, []);

  const [productToCart, setProductToCart] = useState<IProduct | any>([]);
  const [arrCart, setArrCart] = useState<IProduct[]>([]);
  
  const filterProductToCart = () => {
    if (productToCart.length !==0) {
      if (
        !arrCart.some(
          (productFilter: IProduct) => productFilter.id === productToCart?.id
          )
          ) {
            const newArr = [...arrCart, productToCart];
            setArrCart(newArr);
        toast.success('Item adiciona ao seu carrinho!');
      } else {
        toast.error('O item já foi adiciona ao seu carrinho ');
      }
    }
  };

  // const {} = useContext(UserContext)
  const Navigate = useNavigate()
  const logoutUser = ()=>{
    
    localStorage.removeItem("@KBTOKEN")
    localStorage.removeItem("@KBUSERID")
    Navigate("/")
  }

  const removeAllProducts = () =>{
    setArrCart([])
  }


  return (
    <CardContext.Provider
      value={{removeAllProducts, arrCart, filterProductToCart ,setProductToCart, products, openCloseModal, setOpenCloseModal, logoutUser }}
    >
      {children}
    </CardContext.Provider> 
  );
};
