import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CardContext } from '../../../providers/CardContext';

const CartProductList = () => {
  const { arrCart, removeAllProducts } = useContext(CardContext);
    return (
      
  <StyledCartProductList>
    <ul>
      <CartProductCard />
    </ul>

    <div className='totalBox'>
      <StyledParagraph>
        <strong>Total</strong>
      </StyledParagraph>
      {
        arrCart.length !==0? 
      <StyledParagraph className='total'>{[...arrCart].reduce((initValue, finalValue) => initValue + finalValue.price ,0)}</StyledParagraph>
      :
      null
      }
    </div>
    <StyledButton onClick={() =>{
      removeAllProducts()
    }
    } $buttonSize='default' $buttonStyle='gray'>
      Remover todos
    </StyledButton>
  </StyledCartProductList>
);
}
export default CartProductList;
