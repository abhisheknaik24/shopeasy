import { Link } from 'react-router-dom';
import './Banner.css';

const Banner = () => {
  return (
    <div className='home-banner'>
      <p>100% Natural</p>
      <h1>Organinc Fruits</h1>
      <Link to='/shop'>Shop Now</Link>
    </div>
  );
};

export default Banner;
