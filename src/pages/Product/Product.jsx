import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Product.css';
import ProductCard from '../../components/ProductCard/ProductCard';

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_API}/api/products/getProduct/${productId}`
    );
    if (res.data.success) {
      setProduct(res.data.data.product);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  return <div>{product && <ProductCard product={product} />}</div>;
};

export default Product;
