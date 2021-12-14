import React, { useState, useEffect } from 'react';
import { MiInput, MiLabel, MiBoton } from '../component';
import axios from 'axios';
import {useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export const ItemForm = (props) => {
   let history = useHistory();
    let { id } = props.match ? props.match.params : { id: 0 };
    const [texto, setTexto] = useState("");
    const [estado, setEstado] = useState("");
    const [orden, setOrden] = useState("");
    const [nota_id, setNotaid] = useState("");

    
    useEffect(() => {
        if (id != 0) {
            cargarItem(id)
        }
    }, [])
    const cargarItem = (id) => {
        axios.get("http://localhost:8000/api/items/" + id, 
        )
            .then(response => {
                if (response.data.res !== 'success') {
                    alert('error al recibir datos')
                    return
                }
                const item = response.data.data;
                setTexto(item.texto);
                setEstado(item.estado);
                setOrden(item.orden);
                setNotaid(item.nota_id);
             
            
              })
    }

    const enviarDatos = (e) => {
        e.preventDefault();
        const item = {
            texto,estado,orden, nota_id
            
        };
       
        if (id == 0) {
            enviarInsertar(item);
        } else {
            enviarActualizar(item, id);
        }

    }
    const enviarInsertar = (item) => {
        axios.post("http://localhost:8000/api/items", item, 
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


    
    const enviarActualizar = (item, id) => {
        axios.put("http://localhost:8000/api/items/" + id, item
        )
            .then(response => {
                // console.log('datos actualizados', response.data);
                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push('/notaIndexCreador')
            })
    }



    const [listaNotas, setListaNotas] = useState([]);
    useEffect(() => {
        traerListaNotas()
      },[])
  
      const traerListaNotas = (event) => {
          axios.get('http://localhost:8000/api/items', 
          )
              .then(response => {
                  let respuesta = response.data
                  console.log(respuesta.data)
                  setListaNotas(respuesta.data)
            
              });
      }
      
      
    
    return (
        <Row className="mt-5">
      
     
 
            <Col xs={{ span: 6, offset: 3 }}>
                <Form onSubmit={enviarDatos}>
                    <input id="id" type="hidden" value={id} />
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <MiInput id="nombres" className="form-control" placeholder="+ Texto" value={texto} onChange={(event) => { setTexto(event.target.value) }} />
                  
          


                        
                        
                        <MiInput id="nombres" className="form-control" placeholder="+ elemento de la lista 1 o 2" value={estado} onChange={(event) => { setEstado(event.target.value) }} /> 
                         <MiInput id="nombres" className="form-control" placeholder="+ elemento de la lista" value={orden} onChange={(event) => { setOrden(event.target.value) }} />
                         
                    </Form.Group>
                    
      
                    <div className="col-xs-12">
                <div className="group-control">
                  <span></span>
                  <select className="material-control" 
                    value={nota_id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige su categoria"
                    id="etiqueta_id"
                    onChange={(event) => {
                        setNotaid(event.target.value);
                    }}
                  >
                    <option>Selecciona una sección</option>
                    {listaNotas.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.titulo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>



                    <MiBoton variant="dark">Guardar</MiBoton>
                </Form>
            </Col>
        </Row>)
}



