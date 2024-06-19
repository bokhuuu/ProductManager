import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: "",
    type: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/src/backend/index.php", product)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form id="product_form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            className="form-control"
            value={product.sku}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productType">Product Type</label>
          <select
            id="productType"
            className="form-control"
            value={product.type}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="DVD">DVD</option>
            <option value="Book">Book</option>
            <option value="Furniture">Furniture</option>
          </select>
        </div>
        {product.type === "DVD" && (
          <div className="form-group">
            <label htmlFor="size">Size (MB)</label>
            <input
              type="number"
              id="size"
              className="form-control"
              value={product.size}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {product.type === "Book" && (
          <div className="form-group">
            <label htmlFor="weight">Weight (Kg)</label>
            <input
              type="number"
              id="weight"
              className="form-control"
              value={product.weight}
              onChange={handleChange}
              required
            />
          </div>
        )}
        {product.type === "Furniture" && (
          <>
            <div className="form-group">
              <label htmlFor="height">Height (cm)</label>
              <input
                type="number"
                id="height"
                className="form-control"
                value={product.height}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="width">Width (cm)</label>
              <input
                type="number"
                id="width"
                className="form-control"
                value={product.width}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="length">Length (cm)</label>
              <input
                type="number"
                id="length"
                className="form-control"
                value={product.length}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
