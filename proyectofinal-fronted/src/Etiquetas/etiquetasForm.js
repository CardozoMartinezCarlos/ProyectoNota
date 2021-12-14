import React, { useState, useEffect } from 'react';
import { MiInput, MiLabel, MiBoton } from '../component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const EtiquetasForm = (props) => {
    let history = useHistory();
    

  
   

    let { id } = props.match ? props.match.params : { id: 0 };
    
    const [nombre, setNombre] = useState("");



    useEffect(() => {
        if (id != 0) {
            cargarEtiquetas(id)
        }
    }, [])
    const cargarEtiquetas = (id) => {
        axios.get("http://localhost:8000/api/etiquetas/" + id
        )
            .then(response => {
                if (response.data.res !== 'success') {
                    alert('error al recibir datos')
                    return
                }
                const etiquetas = response.data.data;
               
                setNombre(etiquetas.nombre);
            }
              )
    }

    const enviarDatos = (e) => {
        e.preventDefault();
        const etiquetas = {
            nombre
            
            
        };
        // console.log(persona);
        if (id == 0) {
            enviarInsertar(etiquetas);
        } else {
            enviarActualizar(etiquetas, id);
        }

    }
    const enviarInsertar = (etiquetas) => {
        axios.post("http://localhost:8000/api/etiquetas", etiquetas
        )
            .then(response => {
                // console.log('datos insertados', response.data);
                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push('/notaIndexCreador')
            
              })
    }
    const enviarActualizar = (etiquetas, id) => {
        axios.put("http://localhost:8000/api/etiquetas/" + id, etiquetas
        )
            .then(response => {
               
                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push('/etiquetas')
            
              });
    }
    return (
        <Row className="mt-5">
    
             <div>
   
   </div> 
            <Col xs={{ span: 6, offset: 3 }}>
                <Form onSubmit={enviarDatos}>
                    <input id="id" type="hidden" value={id} />
                    <Form.Group>
                    <Form.Label>:</Form.Label>
                    <h2 align="center">Cree su Categoria</h2>  
                        <MiInput id="nombre"  className="form-control" placeholder="Nombre" value={nombre} onChange={(event) => { setNombre(event.target.value) }} />
                        <Form.Label></Form.Label>
                      
                    </Form.Group>
                    
                    <MiBoton variant="dark">Guardar</MiBoton>
                </Form>
            </Col>
        </Row>)
}