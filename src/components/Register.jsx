import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Register = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    size: "",  // Campo para el talle
    price: "", 
    stock: "",
    sales: 0,  // Campo para las ventas
    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Error al agregar el producto. Verifica los datos.");
      }

      const data = await res.json();
      setSuccess("Producto agregado correctamente.");
      setProduct({
        name: "",
        category: "",
        size: "",
        price: "", 
        stock: "",
        sales: 0,
       
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Link className="btn btn-success" to="/">
          Inicio
        </Link>
        <h1>Agregar Producto</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Form className="row" onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3 col-lg-6 col-md-6 col-12"
            controlId="formProductName"
          >
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              value={product.name}
              onChange={handleChange}
              placeholder="Nombre Producto"
              name="name"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              placeholder="Categoria"
              value={product.category}
              onChange={handleChange}
              name="category"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Label>Talle</Form.Label>
            <Form.Control
              type="text"
              placeholder="Talle"
              value={product.size}
              onChange={handleChange}
              name="size"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock"
              value={product.stock}
              onChange={handleChange}
              name="stock"
              min="0"
              required
            ></Form.Control>
          </Form.Group>
          {/* Campo para el precio */}
          <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Precio"
              value={product.price}
              onChange={handleChange}
              name="price"
              min="0"
              required
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Subir Producto"}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
