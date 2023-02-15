import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <Link to='/'>
        <img
          src='/images/shopeasy.svg'
          className='footer-logo'
          alt='shopeasy'
        />
      </Link>
      <p className='footer-copyright'>
        &#169; {new Date().getFullYear()} Created with{' '}
        <AiFillHeart className='footer-heart' /> by <b>Abhishek Naik</b>.
      </p>
    </div>
  );
};

export default Footer;
