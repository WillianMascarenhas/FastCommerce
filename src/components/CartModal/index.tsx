import { MdClose } from 'react-icons/md';
import { useContext } from 'react';
import CartProductList from './CartProductList';
import { StyledCartModalBox } from './style';
import { StyledParagraph, StyledTitle } from '../../styles/typography';
import { CardContext } from '../../providers/CardContext';

const CartModal = () => {

  const { setOpenCloseModal } = useContext(CardContext)
 

  return (
    <StyledCartModalBox>
      <dialog>
        <header>
          <StyledTitle tag='h2' $fontSize='three'>
            Carrinho de compras
          </StyledTitle>
          <button type='button' aria-label='Fechar' onClick={() => {
            setOpenCloseModal(false)
          }}>
            <MdClose size={21} />
          </button>
        </header>
        <div className='cartBox'>
          <CartProductList />

          <div className='emptyBox'>
            <StyledTitle tag='h3' $fontSize='three' textAlign='center'>
              Sua sacola está vazia
            </StyledTitle>
            <StyledParagraph textAlign='center'>Adicione itens</StyledParagraph>
          </div>
        </div>
      </dialog>
    </StyledCartModalBox>
  );}

export default CartModal;
