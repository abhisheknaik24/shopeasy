import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../app/slices/cartSlice';
import { RiCloseFill } from 'react-icons/ri';
import { BiPlus, BiMinus } from 'react-icons/bi';
import './Cart.css';

const Cart = ({ setCartActive }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const total = useSelector((state) => state.cart.total);

  return (
    <div className='cart'>
      <div className='cart-header'>
        <h1 className='cart-title'>Cart</h1>
        <button name='btn-cart-close' onClick={() => setCartActive(false)}>
          <RiCloseFill size={25} />
        </button>
      </div>
      <ul className='products-cart'>
        {cart &&
          cart.map((product) => (
            <li key={product._id} className='products-cart-link'>
              <img
                src={`${import.meta.env.VITE_SERVER_API}/images/${
                  product.image
                }`}
                className='product-cart-img'
                alt='product'
              />
              <div className='products-cart-right'>
                <p className='product-cart-title'>{product.title}</p>
                <p className='product-cart-price'>
                  &#8377;
                  {product.price.$numberDecimal -
                    (product.price.$numberDecimal / 100) * product.discount}
                  /-
                </p>
                <div className='product-cart-buttons'>
                  <button
                    className='btn-decrease'
                    onClick={() => dispatch(decreaseQuantity(product))}
                  >
                    <BiMinus size={25} />
                  </button>
                  <p className='product-cart-quantity'>{product.quantity}</p>
                  <button
                    className='btn-increase'
                    onClick={() => dispatch(increaseQuantity(product))}
                  >
                    <BiPlus size={25} />
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <div className='cart-footer'>
        {!total <= 0 && (
          <p className='products-cart-total'>Total : &#8377;{total}/-</p>
        )}
        <Link
          to='/checkout'
          className='btn-checkout'
          onClick={() => setCartActive(false)}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
