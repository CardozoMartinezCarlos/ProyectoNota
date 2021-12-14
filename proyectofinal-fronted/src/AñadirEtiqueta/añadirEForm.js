import React, { useState, useEffect } from 'react';
import { MiInput, MiLabel, MiBoton } from '../component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const AñadirForm = (props) => {

    let { id } = props.match ? props.match.params : { id: 0 };
    console.log(id);
    let nota_id =id;
    let history = useHistory();
    
    const [etiqueta_id, setEtiquetaid] = useState("");
   

   /* useEffect(() => {
        if (id != 0) {
            cargarTodo(id)
        }
    }, [])
    const cargarTodo = (id) => {
        axios.get("http://localhost:8000/api/notaetiqueta/" + id,
        )
            .then(response => {
                if (response.data.res !== 'success') {
                    alert('error al recibir datos')
                    return
                }
                const notoe = response.data.data;
                setNotaid(notoe.nota_id);
                setEtiquetaid(notoe.etiqueta_id);
              
                

             
            }
              )
    }  */

    const enviarDatos = (e) => {
        e.preventDefault();
        const notoe = {
            nota_id,etiqueta_id
            
        };
        // console.log(persona);
        if (id !== 0) {
            enviarInsertar(notoe);
        } else {
           /*  enviarActualizar(notoe, id); */
        }

    }
    const enviarInsertar = (notoe) => {
        axios.post("http://localhost:8000/api/notaetiqueta", notoe,
        )
            .then(response => {
                // console.log('datos insertados', response.data);
                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push("/nota");
            }
        )
    }
   /*  const enviarActualizar = (notoe, id) => {
        axios.put("http://localhost:8000/api/notaetiqueta/" + id, notoe,
        )
            .then(response => {
                // console.log('datos actualizados', response.data);
                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push('/')
            }
              )
    }
 */




 

    const [listaEtiquetas, setListaEtiquetas] = useState([]);

    useEffect(() => {
        traerListaEtiquetas()
    },[])

    const traerListaEtiquetas = (event) => {
        axios.get('http://localhost:8000/api/etiquetas'
        )
            .then(response => {
                let respuesta = response.data
                console.log(respuesta.data)
                setListaEtiquetas(respuesta.data)
                  }
      );
    }





    return (
        <Row className="mt-5">
            
               <div>

                
                   
                   </div> 
              
            <Col xs={{ span: 6, offset: 3 }}>
                <Form onSubmit={enviarDatos}>
                    <input id="id" type="hidden" value={id} />
                    <h1>Seleccione su Etiqueta</h1>
                    <Form.Group>
                        
                    
                        
                        <Form.Label></Form.Label>
                       
                        
                    
                <div className="col-xs-12">
                <div className="group-control">
                  <span></span>
                  <select className="material-control" 
                    value={etiqueta_id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige su categoria"
                    id="etiqueta_id"
                    onChange={(event) => {
                      setEtiquetaid(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                    {listaEtiquetas.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

                    </Form.Group>
                    
                    <MiBoton variant="dark">Guardar</MiBoton>
                </Form>
            </Col>
        </Row>)
}