import { MdShoppingCart, MdLogout } from 'react-icons/md';

import { useContext } from 'react';
import SearchForm from './SearchForm';
import { StyledHeader } from './style';
import LogoKenzieBurguer from '../../assets/LogoKenzieBurguer.svg';
import { StyledContainer } from '../../styles/grid';
import { CardContext } from '../../providers/CardContext';

const Header = () => {
  const {setOpenCloseModal } = useContext(CardContext)
  const { logoutUser }=  useContext(CardContext)

  return (
  <StyledHeader>
    <StyledContainer containerWidth={1300}>
      <div className='flexGrid'>
        <img
          src={LogoKenzieBurguer}
          alt='Kenzie Burguer Logo'
          className='logo'
        />
        <nav className='nav' role='navigation'>
          <SearchForm />
          <div className='buttons'>
            <button
              type='button'
              onClick={() => {
                setOpenCloseModal(true)
              }}
            >
              <MdShoppingCart size={28} />
            </button>
            <button onClick={() => {
              logoutUser()
            }
            } type='button'>
              <MdLogout size={28} />
            </button>
          </div>
        </nav>
      </div>
    </StyledContainer>
  </StyledHeader>
);
}

export default Header;
