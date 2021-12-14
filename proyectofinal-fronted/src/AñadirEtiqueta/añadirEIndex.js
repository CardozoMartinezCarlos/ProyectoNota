import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useHistory,Link } from "react-router-dom";


import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export const EmpleosIndex = (props) => {
    let history = useHistory();
    const access_token = localStorage.getItem('access_token');
    if(access_token==null){
        history.push('/login');
    }
    const headers = {
        'Authorization': 'Bearer ' + access_token
    }
  

    const [listaEmpleos, setListaEmpleos] = useState([]);
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        traerListaEmpleos()
    },[])

    const traerListaEmpleos = (event) => {
        axios.get('http://localhost:8000/api/empleos' , { headers }
        )
            .then(response => {
                let respuesta = response.data
                console.log(respuesta.data)
                setListaEmpleos(respuesta.data)
            },(error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                  history.push("/login");
                  return;
                }
                return error;
              }
      );
    }
    const eliminarEmpleos = (id) => {
        const confirmacion = window.confirm('Está seguro que desea eliminar?');
        if (!confirmacion) {
            return;
        }

        axios.delete('http://localhost:8000/api/empleos/' + id, { headers }
        )
            .then(response => {
                if (response.data.res) {
                    alert('Eliminado Correctamente!');
                    traerListaEmpleos();
                } else {
                    alert('Hubo un error al eliminar');
                }
            },(error) => {
                if (error.response.status === 401 || error.response.status === 403) {
                  history.push("/alertas");
                  return;
                }
                return error;
              });
    }
    const BuscarEmpleo = () => {
       
        const Nombre = {
            titulo
        };
        axios.post('http://localhost:8000/api/empleos/',Nombre)
            .then(response => {
                if (response.data.res == true) {
                    setListaEmpleos(response.data.Empleos)
                } else {
                    console.log("Error traer Empleos")
                }
            });
    }

return (
    < div className="container">

            <Row><h1>Trabajos</h1></Row>

           

            

   
    
    <div className="mt-5">
      <h2 align="center">Lista de los Empleos Publicados </h2>
        {/* <a onClick={traerPersonas} href="#">Traer Personas</a> */}
        <Table striped bordered hover variant="dark" > 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>titulo</th>
                    <th>descripcion</th>
                    <th>empresa</th>
                    <th>fechaPublicacion</th>
                    <th>telefono</th>
                    <th>email</th>

                   
                </tr>
            </thead>
            <tbody>
                {listaEmpleos.map(item =>
                    <tr key={"item-" + item.id}>
                        <td>{item.id}</td>
                        <td>{item.titulo}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.empresa}</td>
                        <td>{item.fechaPublicacion}</td>
                        <td>{item.telefono}</td>
                        <td>{item.email}</td>
                      

                        
                       
                        <td>
                            <Button onClick={() => { eliminarEmpleos(item.id) }} variant="danger">Eliminar</Button>
                        </td>
                        <td>
                        <Button variant="dark"><Link to={"/empleos" + item.id}>Detalle Empleo</Link></Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>

    </div>
)


}