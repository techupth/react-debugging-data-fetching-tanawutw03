import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // มี await ต้องมี async เสมอ
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products"); // เอา url ไปลองเปิดใน browser เพื่อเช็ค endpoint ได้ ว่าเรา access ได้ไหม
        // console.log(response);
        // เพราะใน data ที่ส่งกลับมามี nested objects products ที่เป็น array of objects จึงต้องใช้ response.data.products แทน response.data.data
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.title}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            {/* แก้จาก products.picture เป็น product.thumbnail อ้างอิงตาม key ที่ res กลับมา */}
            <img src={product.thumbnail} alt={product.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
