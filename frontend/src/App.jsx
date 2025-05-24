import "./App.css";
import ProductCard from "./components/Product/ProductCard";
import CartSection from "./components/Cart/CartSection";
import { useEffect, useState } from "react";
import { get } from "./serviceProxy";
import { DeviceTypeContext } from "./contexts/useDeviceType";
import { getDeviceType } from "./utils";

function App() {
  const [products, setProducts] = useState(null);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [cartInfo, setCartInfo] = useState({});

  const [cartTotal, setCartTotal] = useState(0);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let total = 0;

    const updatedCartProducts =
      products?.filter((product) => {
        if (cartInfo[product.id]) {
          product.quantity = cartInfo[product.id];
          total += parseFloat(product.quantity * product.price);
        }
        return !!cartInfo[product.id];
      }) ?? [];

    setCartTotal(total);
    
    setCartProducts(updatedCartProducts);
  }, [cartInfo]);

  const cartClickHanlder = (e, id, type) => {
    e.stopPropagation();

    const currentQuantity = cartInfo[id] || 0;

    switch (type) {
      case "add":
        setCartInfo((existingCartInfo) => {
          return { ...existingCartInfo, [id]: 1 };
        });
        break;

      case "inc":
        setCartInfo((existingCartInfo) => {
          return { ...existingCartInfo, [id]: currentQuantity + 1 };
        });
        break;

      case "dec":
        setCartInfo((existingCartInfo) => {
          return currentQuantity > 1
            ? { ...existingCartInfo, [id]: currentQuantity - 1 }
            : { ...existingCartInfo, [id]: 0 };
        });
        break;

      case "del":
        setCartInfo((existingCartInfo) => {
          delete existingCartInfo[id];
          return { ...existingCartInfo };
        });
        break;
      default:
        break;
    }
  };

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
              <ProductCard
                key={ind}
                product={product}
                cartClickHanlder={cartClickHanlder}
                cartInfo={cartInfo?.[product.id]}
              />
            ))}
          </div>
        </div>
      </DeviceTypeContext.Provider>
      <CartSection
        cartTotal={cartTotal}
        cartClickHanlder={cartClickHanlder}
        cartProducts={cartProducts}
      />
    </div>
  );
}

export default App;
