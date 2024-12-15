import React, { useState } from 'react'
import { Button, Form, Container } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'

const Edit = () => {
    // Estado para almacenar los datos del producto
    const [product, setProduct] = useState({name: '', category: '', stock: ''});

    // Manejar cambios en los campos del formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    // Manejar envio del formulario 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Producto actualizado', product);
        // Agrego logica para actualizar el producto, como enviar datos a una API
        setProduct({name: '', category: '', stock: ''});
        
    }
    const { id } = useParams();
  return (
    <Container className="mt-5">
    <Link className="btn btn-success mb-3" to="/">
      Inicio
    </Link>
    <h1>Editar Producto</h1>
    <p>Estás editando el producto con ID: {id}</p>
    <Form className="row" onSubmit={handleSubmit}>
      <Form.Group className="mb-3 col-lg-6 col-md-6 col-12" controlId="formProductName">
        <Form.Label>Nombre del Producto</Form.Label>
        <Form.Control
          type="text"
          value={product.name}
          onChange={handleChange}
          placeholder="Nombre Producto"
          name="name"
        />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
        <Form.Label>Categoría</Form.Label>
        <Form.Control
          type="text"
          placeholder="Categoría"
          value={product.category}
          onChange={handleChange}
          name="category"
        />
      </Form.Group>
      <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          type="number"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          name="stock"
        />
      </Form.Group>
      <Button type="submit" className="btn btn-primary">
        Actualizar Producto
      </Button>
    </Form>
  </Container>
  )
}

export default Edit
