import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams(); // Obtengo el ID desde la URL
  const navigate = useNavigate();

  // Estado para almacenar los datos del producto
  const [product, setProduct] = useState({ name: '', category: '',size: '', price: '', stock: '', sales: '' });

  // Función para obtener los datos del producto
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:5000/getdata/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log('Error al obtener el producto:', error);
    }
  };

  // useEffect para cargar datos al montar el componente
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Producto actualizado:', data);

      // Redirigir al usuario a la página de inicio
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Link className="btn btn-success mb-3" to="/">
        Inicio
      </Link>
      <h1>Editar Producto</h1>
      <p>Estás editando el producto con ID: {id}</p>
      <Form className="row" onSubmit={handleSubmit}>
        {/* Nombre del Producto */}
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

        {/* Categoría */}
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

        {/* Stock */}
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

           {/* Precio */}
           <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Precio"
            value={product.price}
            onChange={handleChange}
            name="price"
          />
        </Form.Group>

        {/* Ventas */}
        <Form.Group className="mb-3 col-lg-6 col-md-6 col-12">
          <Form.Label>Ventas</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ventas"
            value={product.sales}
            onChange={handleChange}
            name="sales"
          />
        </Form.Group>

        <Button type="submit" className="btn btn-primary">
          Actualizar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default Edit;


