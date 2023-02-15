import { useSelector } from 'react-redux';
import './Home.css';
import Banner from '../../components/Banner/Banner';
import Policy from '../../components/Policy/Policy';
import Products from '../../components/Products/Products';
import Offers from '../../components/Offers/Offers';

const Home = () => {
  const products = useSelector((state) => state.product.products);
  
  return (
    <div className='content'>
      <Banner />
      <Policy />
      {products.length > 0 && (
        <div className='home-products-content'>
          <h2 className='title'>Best Sellers</h2>
          <Products products={products.slice(0, 5)} />
        </div>
      )}
      <div className='home-offers-content'>
        <Offers />
      </div>
      {products.length > 0 && (
        <div className='home-products-content'>
          <h2 className='title'>Featured Products</h2>
          <Products products={products.slice(0, 5)} />
        </div>
      )}
    </div>
  );
};

export default Home;
