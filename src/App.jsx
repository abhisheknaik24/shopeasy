import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { products } from './app/slices/productSlice';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Product from './pages/Product/Product';
import Checkout from './pages/Checkout/Checkout';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Footer from './components/Footer/Footer';
import Cart from './components/Cart/Cart';

const App = () => {
  const dispatch = useDispatch();

  const [cartActive, setCartActive] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get(
      `${
        import.meta.env.VITE_SERVER_API
      }/api/products/getProducts?skip=0&limit=100`
    );
    if (res.data.success) {
      dispatch(products(res.data.data.products));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Navbar setCartActive={setCartActive} />
      {cartActive && <Cart setCartActive={setCartActive} />}
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/product/:productId' element={<Product />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
