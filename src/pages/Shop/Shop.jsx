import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { RiCloseFill } from 'react-icons/ri';
import './Shop.css';
import { products } from '../../app/slices/productSlice';
import Filter from '../../components/Filter/Filter';
import Products from '../../components/Products/Products';

const Shop = () => {
  const dispatch = useDispatch();

  const productsData = useSelector((state) => state.product.products);

  const [count, setCount] = useState(10000);

  const [active, setActive] = useState(false);

  const filterProducts = async () => {
    const res = await axios.post(
      `${
        import.meta.env.VITE_SERVER_API
      }/api/products/filterProducts?skip=0&limit=100`,
      { maxPrice: count }
    );
    if (res.data.success) {
      dispatch(products(res.data.data.products));
    }
  };

  useEffect(() => {
    filterProducts();
  }, [count]);

  return (
    <div className='content'>
      <div className='shop-content'>
        <div
          className={`${
            active ? 'shop-filter-content active' : 'shop-filter-content'
          }`}
        >
          <button name='btn-close' onClick={() => setActive(false)}>
            <RiCloseFill size={25} />
          </button>
          <Filter count={count} setCount={setCount} />
        </div>
        <div className='shop-products-content'>
          <button className='shop-filter-btn' onClick={() => setActive(true)}>
            Filter
          </button>
          <Products products={productsData} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
