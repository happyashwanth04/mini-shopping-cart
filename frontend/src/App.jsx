import "./App.css";
import ProductCard from "./components/Product/ProductCard";
import CartSection from "./components/Cart/CartSection";
import { useEffect, useState } from "react";
import { get } from "./serviceProxy";
import {DeviceTypeContext} from "./contexts/useDeviceType";
import { getDeviceType } from "./utils";

function App() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await get("/product");
      setProducts(products.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error...</h2>;
  }
  return (
    <div className="app-container">
      <DeviceTypeContext.Provider value={getDeviceType()}>
        <div className="product-section">
          <h2 className="title">Desserts</h2>

          <div className="products-container">
            {products?.map((product, ind) => (
              <ProductCard key={ind} product={product} />
            ))}
          </div>
        </div>
      </DeviceTypeContext.Provider>
      <CartSection />
    </div>
  );
}

export default App;
