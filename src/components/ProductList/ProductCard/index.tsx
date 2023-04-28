import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { CardContext } from '../../../providers/CardContext';

const ProductCard = () => {
  const {setProductToCart, products, filterProductToCart} = useContext(CardContext)

  return (
  <>
  {
    products.map(product =>(
        <StyledProductCard key={product.id}>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>
          R$ ${product.price}
        </StyledParagraph>
        <StyledButton onClick={()=>{
          setProductToCart(product)
          filterProductToCart()
        }} type='button' $buttonSize='medium' $buttonStyle='green' >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
      ))
    }
  </>
  );
};

export default ProductCard;
