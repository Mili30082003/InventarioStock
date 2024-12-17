// api/productos.js

// Función para registrar un nuevo producto
export const registrarProducto = async (producto) => {
  try {
    const respuesta = await fetch('https://inventariobackend-1.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error('Error al registrar el producto');
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al registrar producto:', error);
    return null;
  }
};

// Función para obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch('https://inventariobackend-1.onrender.com/getdata');
    if (!respuesta.ok) {
      throw new Error('Error al obtener los productos');
    }

    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

// Función para eliminar un producto
export const eliminarProducto = async (id) => {
  try {
    const respuesta = await fetch(`https://inventariobackend-1.onrender.com/delete/${id}`, {
      method: 'DELETE',
    });

    if (!respuesta.ok) {
      throw new Error('Error al eliminar el producto');
    }

    const mensaje = await respuesta.json();
    return mensaje;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    return null;
  }
};

// Función para actualizar un producto
export const actualizarProducto = async (id, datosActualizados) => {
  try {
    const respuesta = await fetch(`https://inventariobackend-1.onrender.com/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    });

    if (!respuesta.ok) {
      throw new Error('Error al actualizar el producto');
    }

    const productoActualizado = await respuesta.json();
    return productoActualizado;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return null;
  }
};

// Función para actualizar ventas de un producto
export const actualizarVentasProducto = async (id, cantidad) => {
  try {
    const respuesta = await fetch(`https://inventariobackend-1.onrender.com/updateventas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cantidad }),
    });

    if (!respuesta.ok) {
      throw new Error('Error al actualizar las ventas');
    }

    const productoActualizado = await respuesta.json();
    return productoActualizado;
  } catch (error) {
    console.error('Error al actualizar ventas:', error);
    return null;
  }
};

