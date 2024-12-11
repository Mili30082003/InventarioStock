import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './componentes/Dashboard'
import addProduct from './componentes/AddProduct'
import editProfile from './componentes/EditProfile'
import Profile from './componentes/Profile'
import './App.css'


function App() {

  return (
    <Router>
      <div className='app-container d-flex'>
        <aside className='sidebar bg-dark text-white p-3'>
          <h4 className='mb-4'>Inventario</h4>
          <nav>
            <ul className='nav flex-column'>
              <li className='nav-item mb-2'>
                <Link to="/" className='nav-link text-white'>Dashboard</Link>
              </li>
              <li>
                <Link to="/add-product" className='nav-link text-white'> Agregar Producto</Link>
              </li>
              <li>
                <Link to="/profile" className='nav-link text-white'> Perfil</Link>
              </li>
              <li>
                <Link to="/edit-profile" className='nav-link text-white'> Editar Perfil</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className='main-content flex-grow-1 p-4' >
          <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/add-product' element={<addProduct/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/edit-profile' element={<editProfile/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
