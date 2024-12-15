import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Register = () => {
  const [product, setProduct] = useState({ name: '', category: '', stock: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Producto Agregado:', product);
    setProduct({ name: '', category: '', stock: '' });
  };

  return (
    <>
      <Container className="mt-5">
        <Link className="btn btn-success" to="/">
          Inicio
        </Link>
        <h1>Agregar Producto</h1>
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
            ></Form.Control>
          </Form.Group>
          <Button type="submit" className="btn btn-primary">
            Subir Producto
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
