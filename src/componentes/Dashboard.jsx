import React, { useState }from 'react';

function Dashboard () {
    const [searchTerm, setSearchTerm ] = useState("");
        const products = [
            {id: 1, name: "Jeans Las Locas", category:"Jeans", price:5000,quantity:20 },
            {id: 2, name: "Tops", category:"tops", price:6000,quantity:10 },
            {id: 3, name: "Polleras Noche", category:"Noche", price:6000,quantity:5 },
            {id: 4, name: "Shorts", category:"Jeans", price:2000,quantity:25 },
            {id: 5, name: "Remeras", category:"Remeras", price:8000,quantity:30 },  
            ];
    const filterProducts = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div>
        <h2>Dashboard</h2>
        <div className='d-flex gap-3 mb-4'>
            <div className='card p-3 bg-purple text-white' >Total Productos: {products.length}</div>
            <div className='card bg-green text-white p-3'> Total: ${products.reduce((total, product) => total + product.price * product.quantity, 0)}</div>
        </div>
        
    </div>
  );
}

export default Dashboard ;