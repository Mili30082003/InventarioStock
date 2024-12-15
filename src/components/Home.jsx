import React from 'react';
import { FaEye } from 'react-icons/fa';
import { FaPenSquare } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <>
      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-4 d-flex justify-content-end">
            <Link className="btn btn-primary d-flex align-items-center gap-2" to="/register">
              <IoMdAdd /> Agregar Producto
            </Link>
          </div>
          <table className="table table-hover table-bordered">
            <thead className="table-primary">
              <tr className="text-center">
                <th scope="col">ID</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoría</th>
                <th scope="col">Stock</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center align-middle">
                <th scope="row">1</th>
                <td>Producto A</td>
                <td>Jeans</td>
                <td>10</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-success d-flex align-items-center justify-content-center">
                      <FaEye />
                    </button>
                    <Link to='/edit/:id' className="btn btn-primary d-flex align-items-center justify-content-center">
                      <FaPenSquare />
                    </Link>
                    <Link to="/delete/:id" className="btn btn-danger d-flex align-items-center justify-content-center">
                      <MdDelete />
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
