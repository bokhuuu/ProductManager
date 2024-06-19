import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("/src/backend/index.php")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleMassDelete = () => {
    const selectedProducts = products.filter((product) => product.selected);
    const productIds = selectedProducts.map((product) => product.id);

    axios
      .delete("/src/backend/index.php", { data: { productIds } })
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error deleting products:", error);
      });
  };

  const handleCheckboxChange = (productId) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return { ...product, selected: !product.selected };
        }
        return product;
      })
    );
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/add-product")} // Use navigate function
      >
        ADD
      </button>
      <button className="btn btn-danger mb-3 ml-3" onClick={handleMassDelete}>
        MASS DELETE
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Select</th>
            <th>SKU</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <input
                  type="checkbox"
                  className="delete-checkbox"
                  checked={product.selected || false}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </td>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{renderProductDetails(product)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const renderProductDetails = (product) => {
  switch (product.type) {
    case "DVD":
      return `Size: ${product.size} MB`;
    case "Book":
      return `Weight: ${product.weight} Kg`;
    case "Furniture":
      return `Dimensions: ${product.height}x${product.width}x${product.length} cm`;
    default:
      return "";
  }
};

export default ProductList;
