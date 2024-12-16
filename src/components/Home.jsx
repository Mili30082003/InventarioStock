import React, { useState, useEffect } from 'react';
import { FaPenSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cantidad, setCantidad] = useState(""); // Para la cantidad de ventas
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para el filtro de categoría
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [minSales, setMinSales] = useState(""); // Filtro de ventas mínimas
  const [maxSales, setMaxSales] = useState(""); // Filtro de ventas máximas

  // Fetch para obtener productos
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/getdata");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data);
      console.log("Productos obtenidos:", data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Función para eliminar productos
  const deleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        const res = await fetch(`http://localhost:5000/delete/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data.message);
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  // Función para actualizar ventas
  const updateSales = async (id) => {
    if (cantidad <= 0 || isNaN(cantidad)) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    }

    const cantidadInt = parseInt(cantidad);
    const res = await fetch(`http://localhost:5000/updateventas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cantidad: cantidadInt }),
    });

    if (!res.ok) {
      alert("Hubo un error al actualizar las ventas.");
      return;
    }

    const data = await res.json();
    console.log("Ventas actualizadas:", data);
    fetchProducts(); // Volver a obtener los productos actualizados
  };

  // Función para filtrar productos por categoría
  const filterByCategory = (products) => {
    return products.filter(product =>
      selectedCategory ? product.category === selectedCategory : true
    );
  };

  // Función para filtrar por búsqueda
  const filterBySearch = (products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Función para filtrar por rango de ventas
  const filterBySalesRange = (products) => {
    return products.filter(product => {
      const sales = product.sales || 0;
      const min = minSales ? sales >= minSales : true;
      const max = maxSales ? sales <= maxSales : true;
      return min && max;
    });
  };

  // useEffect para llamar a fetchProducts cuando el componente se monta
  useEffect(() => {
    fetchProducts();
  }, []);

  // Productos filtrados por las distintas condiciones
  let filteredProducts = filterByCategory(products);
  filteredProducts = filterBySearch(filteredProducts);
  filteredProducts = filterBySalesRange(filteredProducts);

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-4 d-flex justify-content-end">
          <Link className="btn btn-primary d-flex align-items-center gap-2" to="/register">
            <IoMdAdd /> Agregar Producto
          </Link>
        </div>

        {/* Filtros de categoría y búsqueda */}
        <div className="d-flex align-items-center mb-2">
          <label htmlFor="categoryFilter" className="form-label mb-0 me-2">Filtrar por categoría</label>
          <select
            id="categoryFilter"
            className="form-select form-select-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: '150px' }}
          >
            <option value="">Todas las categorías</option>
            {Array.from(new Set(products.map(product => product.category))).map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Filtro de búsqueda */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filtros de ventas */}
        <div className="d-flex gap-2 mb-3">
          <input
            type="number"
            placeholder="Ventas mínimas"
            className="form-control"
            value={minSales}
            onChange={(e) => setMinSales(e.target.value)}
          />
          <input
            type="number"
            placeholder="Ventas máximas"
            className="form-control"
            value={maxSales}
            onChange={(e) => setMaxSales(e.target.value)}
          />
        </div>

        <table className="table table-hover table-bordered">
          <thead className="table-primary">
            <tr className="text-center">
              <th scope="col">ID</th>
              <th scope="col">Producto</th>
              <th scope="col">Categoría</th>
              <th scope="col">Talle</th>
              <th scope="col">Stock</th>
              <th scope="col">Ventas</th>
              <th scope="col">Precio</th> {/* Nueva columna para precio */}
              <th scope="col">Disponibilidad</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr key={product._id} className="text-center align-middle">
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.size || "No disponible"}</td>
                  <td>{product.stock}</td>
                  <td>{product.sales !== undefined ? product.sales : 0}</td>
                  <td>{product.price ? `$${product.price.toFixed(2)}` : "No disponible"}</td> {/* Mostrar precio */}
                  <td>
                    {product.stock > 0 ? (
                      <span className="badge bg-success">En stock</span>
                    ) : (
                      <span className="badge bg-danger">Sin stock</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/edit/${product._id}`} className="btn btn-primary d-flex align-items-center justify-content-center">
                        <FaPenSquare />
                      </Link>
                      <button
                        className="btn btn-danger d-flex align-items-center justify-content-center"
                        onClick={() => deleteProduct(product._id)}
                      >
                        <MdDelete />
                      </button>
                      <button
                        className="btn btn-info d-flex align-items-center justify-content-center"
                        onClick={() => updateSales(product._id)}
                      >
                        Actualizar Ventas
                      </button>
                      <input
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        placeholder="Cantidad"
                        className="form-control w-auto"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No hay productos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
