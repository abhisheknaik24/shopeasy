import './Products.css';
import ProductsCard from '../ProductsCard/ProductsCard';

const Products = ({ products }) => {
  return (
    <div className='products-cards'>
      {products &&
        products.map((product) => (
          <ProductsCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Products;
