import {
  RiTruckLine,
  RiReplyLine,
  RiSecurePaymentLine,
  RiPhoneLine,
} from 'react-icons/ri';
import './Policy.css';

const Policy = () => {
  return (
    <div className='home-policy'>
      <div className='policy-card'>
        <div className='policy-details'>
          <RiTruckLine size={50} />
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders over $75.00</p>
          </div>
        </div>
        <div className='policy-details'>
          <RiReplyLine size={50} />
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders over $75.00</p>
          </div>
        </div>
        <div className='policy-details'>
          <RiSecurePaymentLine size={50} />
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders over $75.00</p>
          </div>
        </div>
        <div className='policy-details'>
          <RiPhoneLine size={50} />
          <div>
            <h4>Free Shipping</h4>
            <p>On all orders over $75.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
