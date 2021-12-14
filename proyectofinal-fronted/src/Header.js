import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import { cerrarSesion as logout, iniciarSesion } from "./actions/userActions";


export const Header = (props) => {
  let history = useHistory();

  const sesionIniciada = useSelector(
    (state) => state.user.datosSesion.sesionIniciada
  );
  const dispatch = useDispatch();

  const access_token = localStorage.getItem("access_token");
  const name = localStorage.getItem("name");
  if (access_token && !sesionIniciada) {
    dispatch(iniciarSesion());
  }

  const cerrarSesion = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("access_token");
    history.push("/login");
  };
  var styleNav = {
    width: 150,
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ flexDirection: "row", justifyContent:"center", alignItems:"center" }}>
        <Link className="navbar-brand" to="/" style={styleNav}>
          NOTAS
        </Link>
        <Link to="/notaIndexCreador" className="dropdown-item" style={styleNav}>
          Lista de Nota
        </Link>
        <Link to="/nota/create" className="dropdown-item" style={styleNav}>
          Crear Nota
        </Link>
        <Link to="/etiquetas" className="dropdown-item" style={styleNav}>
          Lista de Categoria
        </Link>
        <Link to="/etiquetas/create" className="dropdown-item" style={styleNav}>
          Crear Categoria
        </Link>
        <Link to="/usuarioIndex" className="dropdown-item" style={styleNav}>
          Lista de Usuarios
        </Link>
        <Link to="/usuarioForm/create" className="dropdown-item" style={styleNav}>
          Crear Usuario
        </Link>
        
        <Nav.Item className="ml-auto">
          {sesionIniciada && (
            <a
              onClick={cerrarSesion}
              className="nav-link btn btn-default"
              style={{ cursor: "pointer" }}
            >
              Cerrar sesión
            </a>
          )}
        </Nav.Item>
      </Navbar>
    </>
  );
};