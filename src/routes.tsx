import { Routes, Route } from 'react-router-dom';
import { isHtmlElement } from 'react-router-dom/dist/dom';
import LoginPage from './pages/LoginPage';
import { ProtectedRoutes } from './pages/ProtectedRoutes';
import RegisterPage from './pages/RegisterPage';
import ShopPage from './pages/ShopPage';
import { CardProvider } from './providers/CardContext';
import { UserProvider } from './providers/UserContext';


const Router = () => (
  <Routes>
    <Route
      path='/'
      element={
          <LoginPage />
      } 
    />
 
    <Route
      path='/register'
      element={
          <RegisterPage />
      }
    />

    <Route element={<CardProvider><ProtectedRoutes/></CardProvider>}>

    <Route
      path='/shop'
      element={
          <ShopPage />
      }
      />
      </Route>
  </Routes>
);

export default Router;
