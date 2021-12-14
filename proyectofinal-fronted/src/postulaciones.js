import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useHistory,Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

export const Postulaciones = (props) => {
    let history = useHistory();
      let id = '0';
  

    const [listaEmpleos, setListaEmpleos] = useState([]);
    const [titulo, setTitulo] = useState("");
    

    useEffect(() => {
        traerListaEmpleos()
    },[])

    const traerListaEmpleos = (event) => {
        axios.get('http://localhost:8000/api/indexjob' , 
        )
            .then(response => {
                let respuesta = response.data
                console.log(respuesta.data)
                setListaEmpleos(respuesta.data)
            
              }
      );
    }

    const BuscarEmpleo = (e) => {
        e.preventDefault();

        const postulacionesI = {
            titulo,
        };

        if (id == 0) {
            buscador(postulacionesI);
          } else {
          }
        };
        const buscador = (postulacionesI) => {

        axios.post('http://localhost:8000/api/BuscadorEmpleos',postulacionesI)
            .then(response => {
                if (response.data.res !== "success") {
                    console.log("Error traer Empleos")
                    return;
                  }
               
                  let respuesta = response.data;
                  //console.log(respuesta.categoria);
                  setListaEmpleos(respuesta.data);
          
            });
    }

return (
    <>

      <Row><h1>Trabajos</h1></Row>
       <Form onSubmit={BuscarEmpleo} className="navbar-form" role="search">
      <input value={titulo}size="sm" className="mr-sm-2" type="text" id="titulo"onChange={(event) => {setTitulo(event.target.value)}}placeholder="Buscar"></input>
       <Button size="sm"  variant="dark" type="submit" onClick={() => {
        buscador(); }}
            > Buscar
            </Button>



         </Form>

        
            

   
    
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
               
                        <Button variant="dark"><Link to={"/Formulario"}>Detalle Empleo</Link></Button>
                        </td>
                    </tr>
                )} 
            </tbody>
        </Table>
    </div>
    </>
    
)
                
        


}