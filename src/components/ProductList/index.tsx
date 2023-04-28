import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CardContext } from '../../providers/CardContext';

const ProductList = () => (
    <StyledProductList>
        <ProductCard  />
    </StyledProductList>
  );

export default ProductList;
