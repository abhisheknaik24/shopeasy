import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RiMenuFill, RiCloseFill, RiShoppingCartLine } from 'react-icons/ri';
import './Navbar.css';

const Navbar = ({ setCartActive }) => {
  const [active, setActive] = useState(false);

  const user = useSelector((state) => state.user.user);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <header className='header'>
      <nav className={`${active ? 'nav active' : 'nav'}`}>
        <Link to='/'>
          <img src='/images/shopeasy.svg' className='nav-logo' alt='shopeasy' />
        </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/' onClick={() => setActive(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/shop' onClick={() => setActive(false)}>
              Shop
            </Link>
          </li>
          {!user && (
            <>
              <li className='nav-auth-link'>
                <Link to='/signin' onClick={() => setActive(false)}>
                  Sign In
                </Link>
              </li>
              <li className='nav-auth-link'>
                <Link to='/signup' onClick={() => setActive(false)}>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className='nav-buttons'>
          {!user && (
            <div className='nav-auth'>
              <Link to='/signin' onClick={() => setActive(false)}>
                Sign In
              </Link>
              <Link to='/signup' onClick={() => setActive(false)}>
                Sign Up
              </Link>
            </div>
          )}
          <div className='nav-cart'>
            <button onClick={() => setCartActive(true)}>
              <RiShoppingCartLine />
            </button>
            <span>{cart.length}</span>
          </div>
          {user && (
            <Link to='/' className='nav-user'>
              <img
                src={`${import.meta.env.VITE_SERVER_API}/images/user.webp`}
                className='user-img'
                alt='user'
              />
            </Link>
          )}
          <div className='nav-toggle'>
            <button name='btn-menu' onClick={() => setActive(true)}>
              <RiMenuFill size={25} />
            </button>
            <button name='btn-close' onClick={() => setActive(false)}>
              <RiCloseFill size={25} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
