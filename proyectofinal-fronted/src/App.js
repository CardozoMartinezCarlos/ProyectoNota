import React, { useState } from "react";


import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { Header } from './Header';
import { Login } from './auth/Login';

import { NotaForm } from './Nota/NotaForm';
import { NotaIndex } from './Nota/NotaIndex';
import { EtiquetasForm } from './Etiquetas/etiquetasForm';
import { EtiquetasIndex } from './Etiquetas/etiquetasIndex';
import { ItemForm } from './Item/itemForm';
import { UsuarioForm } from './Usuario/usuarioForm';
import { UsuarioIndex } from './Usuario/usuarioIndex';
import { NotaIndexCreador } from './Nota/NotaIndexCreador';
import { ItemIndex } from './Item/itemIndex';
import { AñadirForm } from './AñadirEtiqueta/añadirEForm';
import { cerrarSesion as logout, iniciarSesion } from "./actions/userActions";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

function App() {
  let history = useHistory();
  const sesionIniciada = useSelector(
    (state) => state.user.datosSesion.sesionIniciada
  );
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const name = localStorage.getItem("name");
  if (access_token && !sesionIniciada) {
    dispatch(iniciarSesion());
  }
  console.log(history);

  return (
    <>
      <Router>
        {redirect && <Redirect to="/login" />}
        {/* Login */}

        <Route path="/login">
          <Login></Login>
        </Route>

        <Route path="/usuarioForm/create">
          <UsuarioForm />
        </Route>
        {sesionIniciada && (
          <>

            <Header></Header>

            <Container id="loquesea">
              <div>
                <Switch>
                  <Route exact path="/">
                    <NotaIndexCreador />
                  </Route>
                  <Route exact path="/nota">
                    <NotaIndexCreador />
                  </Route>
                  <Route path="/nota/edit/:id"
                    component={NotaForm}
                  ></Route>
                  <Route path="/nota/create">
                    <NotaForm />
                  </Route>
                  <Route exact path="/etiquetas">
                    <EtiquetasIndex />
                  </Route>
                  <Route path="/etiquetas/edit/:id"
                    component={EtiquetasForm}
                  ></Route>
                  <Route path="/etiquetas/create">
                    <EtiquetasForm />
                  </Route>
                  <Route exact path="/items">
                    <ItemIndex />
                  </Route>
                  <Route path="/items/edit/:id"
                    component={ItemForm}
                  ></Route>
                  <Route path="/items/create">
                    <ItemForm />
                  </Route>


                  <Route path="/notaetiqueta/:id"
                    component={AñadirForm}

                  ></Route>
                  <Route path="/nota/:id"
                    component={NotaIndex}

                  ></Route>

                  <Route path="/usuario/edit/:id"
                    component={UsuarioForm}
                  ></Route>


                  <Route exact path="/usuarioIndex">
                    <UsuarioIndex />
                  </Route>

                  <Route exact path="/notaIndexCreador">
                    <NotaIndexCreador />
                  </Route>

                </Switch>
              </div>
            </Container>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
