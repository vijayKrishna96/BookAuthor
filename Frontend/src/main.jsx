import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';

import Hero,{loader as heroLoader} from './components/Hero';
import Products,{loader as productsLoader} from './components/Products/product';
import Product,{loader as productLoader} from './components/Product/product';
import store from './app/store'
import { Provider } from 'react-redux'
import SignupForm from './components/SignUp/signupForm';
import LoginForm from './components/Login/loginForm ';
import Logout from './components/Logout/Logout';
import Cart from './components/Cart/Cart';
import WishList from './components/WishList/WishList';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: '/',
        element: <Hero />,
        loader: heroLoader
      },
      {
        path: '/products',
        element:<Products />,
        loader: productsLoader
      },
      {
        path:'/product/:bookId',
        element: <Product />,
        loader: productLoader
      },
      {
        path: '/signup',
        element: <SignupForm />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/logout',
        element: <Logout />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/wishlist',
        element: <WishList />
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
