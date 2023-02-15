import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProductsCard.css';
import { postCart } from '../../app/slices/cartSlice';

const ProductsCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartIds = useSelector((state) => state.cart.cartIds);

  return (
    <div className='products-card'>
      <Link to={`/product/${product._id}`}>
        <img
          src={`${import.meta.env.VITE_SERVER_API}/images/${product.image}`}
          className='product-img'
          alt='product'
        />
        <h4 className='product-title'>{product.title}</h4>
      </Link>
      <div className='product-footer'>
        <p className='product-price'>&#8377;{product.price.$numberDecimal}</p>
        {!cartIds.includes(product._id) && (
          <button
            className='btn-add-to-cart'
            onClick={() => dispatch(postCart(product))}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
