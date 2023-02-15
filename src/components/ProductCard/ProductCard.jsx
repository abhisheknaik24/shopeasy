import { useDispatch, useSelector } from 'react-redux';
import './ProductCard.css';
import { postCart } from '../../app/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartIds = useSelector((state) => state.cart.cartIds);

  return (
    <div className='product-card'>
      <div className='product-left'>
        <img
          src={`${import.meta.env.VITE_SERVER_API}/images/${product.image}`}
          className='product-img'
          alt='product'
        />
      </div>
      <div className='product-right'>
        <h1 className='product-title'>{product.title}</h1>
        <hr />
        <p className='product-discount-price'>
          <span className='product-discount'>-{product.discount}%</span>
          &#8377;
          {product.price.$numberDecimal -
            (product.price.$numberDecimal / 100) * product.discount}
          /-
        </p>
        <p className='product-price'>
          M.R.P.: <del>&#8377;{product.price.$numberDecimal}/-</del>
        </p>
        <p className='product-taxes'>Inclusive of all taxes</p>
        {!cartIds.includes(product._id) && (
          <button
            className='btn-add-to-cart'
            onClick={() => dispatch(postCart(product))}
          >
            Add to Cart
          </button>
        )}
        <hr />
        <p className='product-offers'>Offers</p>
        <div className='offers-cards'>
          {product.offers.map((offer, index) => (
            <div key={index} className='offers-card'>
              <p className='product-offer'>{offer}</p>
            </div>
          ))}
        </div>
        <hr />
        <p className='product-policies'>Policies</p>
        <div className='policies-cards'>
          {product.policies.map((policy, index) => (
            <div key={index} className='policies-card'>
              <p className='product-policy'>{policy}</p>
            </div>
          ))}
        </div>
        <hr />
        <div className='product-specs'>
          <table>
            <tbody>
              {product.specs.map((spec, index) => (
                <tr key={index}>
                  <td className='specs-key'>{spec.key}</td>
                  <td className='specs-value'>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
        <p className='product-features'>About this item</p>
        <ul className='product-features-links'>
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
