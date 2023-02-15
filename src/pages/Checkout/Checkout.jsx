import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BiPlus } from 'react-icons/bi';
import { RiCloseFill } from 'react-icons/ri';
import './Checkout.css';
import CheckoutTable from '../../components/CheckoutTable/CheckoutTable';
import { postAddresses } from '../../app/slices/userSlice';

const Checkout = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const cart = useSelector((state) => state.cart.cart);

  const total = useSelector((state) => state.cart.total);

  const [active, setActive] = useState(false);

  const [address, setAddress] = useState('');

  const [paymentOption, setPaymentOption] = useState('');

  const handleAddressSubmitForm = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_API}/api/users/addAddress`,
      { email: user.email, address: address }
    );
    if (res.data.success) {
      dispatch(postAddresses(res.data.data.user.addresses));
      setActive(false);
      setAddress('');
    }
  };

  const handleSelectAddress = async (id, e) => {
    e.preventDefault();
    const res = await axios.put(
      `${import.meta.env.VITE_SERVER_API}/api/users/updateAddress`,
      { email: user.email, id: id }
    );
    if (res.data.success) {
      dispatch(postAddresses(res.data.data.user.addresses));
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (
      (user,
      user.addresses.length > 0,
      cart.length > 0,
      total !== 0,
      paymentOption)
    ) {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/orders/addOrder`,
        {
          email: user.email,
          products: cart,
          grandTotal: total,
          paymentOption: paymentOption,
          isPayment: false,
        }
      );
      if (res.data.success) {
        navigate('/');
      }
    }
  };

  if (user) {
    return (
      <div className='content'>
        <div className='checkout-content'>
          <div className='checkout-content-card'>
            <div className='checkout-table-card'>
              <CheckoutTable cart={cart} />
            </div>
            <div className='checkout-order-summary-card'>
              <h3 className='checkout-order-summary-title'>Order Summary</h3>
              <div className='checkout-order-summary-info'>
                <p className='checkout-order-summary-key'>Sub Total</p>
                <p className='checkout-order-summary-value'>&#8377;{total}/-</p>
              </div>
              <div className='checkout-order-summary-info'>
                <p className='checkout-order-summary-key'>Shipping</p>
                <p className='checkout-order-summary-value'>Free</p>
              </div>
              <div className='checkout-order-summary-total-info'>
                <p className='checkout-order-summary-total-key'>Total</p>
                <p className='checkout-order-summary-total-value'>
                  &#8377;{total}/-
                </p>
              </div>
            </div>
            <div className='checkout-addresses-cards'>
              {user.addresses.map((address) => (
                <div key={address._id} className='checkout-address-card'>
                  <p className='checkout-address-title'>{address.address}</p>
                  {address.isSelected ? (
                    <p className='checkout-address-select'>Selected</p>
                  ) : (
                    <button
                      className='checkout-address-select-btn'
                      onClick={(e) => handleSelectAddress(address._id, e)}
                    >
                      Select
                    </button>
                  )}
                </div>
              ))}
              <div className='checkout-address-card'>
                <button
                  className='checkout-address-add-btn'
                  onClick={() => setActive(true)}
                >
                  <BiPlus size={25} />
                </button>
              </div>
            </div>
            <div className='checkout-payment-cards'>
              <h3 className='checkout-payment-title'>Payment Option</h3>
              <div className='checkout-payment-card'>
                <input
                  type='radio'
                  className='checkout-payment-input'
                  name='payment'
                  value='Cash on Delivery'
                  onChange={(e) => setPaymentOption(e.target.value)}
                />
                <label className='checkout-payment-label'>
                  Cash on Delivery
                </label>
              </div>
            </div>
            {cart.length > 0 && user.addresses.length > 0 && paymentOption && (
              <div className='checkout-content-card-footer'>
                <button
                  className='checkout-complete-btn'
                  onClick={(e) => handleSubmitOrder(e)}
                >
                  Complete an Order
                </button>
              </div>
            )}
          </div>
          <div
            className={`${
              active
                ? 'checkout-address-modal active'
                : 'checkout-address-modal'
            }`}
          >
            <div className='checkout-content-card'>
              <div className='checkout-address-header'>
                <h3>Add Address</h3>
                <button
                  name='btn-checkout-address-close'
                  onClick={() => setActive(false)}
                >
                  <RiCloseFill size={25} />
                </button>
              </div>
              <form onSubmit={(e) => handleAddressSubmitForm(e)}>
                <div className='checkout-address-control-input'>
                  <label className='checkout-address-label'>Address:</label>
                  <input
                    type='text'
                    className='checkout-address-input'
                    name='address'
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className='checkout-address-control-btn'>
                  <button type='submit' className='checkout-address-btn'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    useEffect(() => {
      navigate('/signin');
    });
  }
};

export default Checkout;
