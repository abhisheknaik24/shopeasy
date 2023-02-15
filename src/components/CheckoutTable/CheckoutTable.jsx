import './CheckoutTable.css';

const CheckoutTable = ({ cart }) => {
  return (
    <table className='checkout-table'>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cart &&
          cart.map((product) => (
            <tr key={product._id}>
              <td>
                <div className='product-checkout-info'>
                  <img
                    src={`${import.meta.env.VITE_SERVER_API}/images/${
                      product.image
                    }`}
                    className='product-checkout-img'
                    alt='product'
                  />
                  <p className='product-checkout-title'>{product.title}</p>
                </div>
              </td>
              <td>
                <p className='product-checkout-quantity'>{product.quantity}</p>
              </td>
              <td>
                <p className='product-checkout-price'>
                  &#8377;
                  {product.price.$numberDecimal -
                    (product.price.$numberDecimal / 100) * product.discount}
                  /-
                </p>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default CheckoutTable;
