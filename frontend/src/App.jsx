import "./App.css";
import ProductCard from "./components/Product/ProductCard";
import CartSection from "./components/Cart/CartSection";
import { useEffect, useState } from "react";
import { get } from "./serviceProxy";
function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await get("/product");
      setProducts(products);
      console.log({products})
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts()
  }, []);
  return (
    <div className="app-container">
      <div className="product-section">
        <h2 className="title">Desserts</h2>

        <div className="products-container">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
      <CartSection />
    </div>
  );
}

export default App;
