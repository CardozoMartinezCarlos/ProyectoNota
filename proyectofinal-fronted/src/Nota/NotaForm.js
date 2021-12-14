import React, { useState, useEffect } from 'react';
import {
    MiInput, MiLabel, MiBoton, MiSelect,
    MiGroup,
    MiColumnaSelect,
    MibarHigh,
} from '../component';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SentimentSatisfiedOutlined } from '@material-ui/icons';
import { Button } from '@material-ui/core';


export const NotaForm = (props) => {
    let user_id = localStorage.getItem("user");
    let history = useHistory();
    let { id } = props.match ? props.match.params : { id: 0 };
    const [titulo, setTitulo] = useState("");
    const [texto, setTexto] = useState("");
    const [color, setColor] = useState("#000");
    const [estado, setEstado] = useState("1");

    useEffect(() => {
        if (id != 0) {
            cargarNotas(id)
        }
    }, [])
    const cargarNotas = (id) => {
        axios.get("http://localhost:8000/api/notas/" + id,
        )
            .then(response => {
                if (response.data.res !== 'success') {
                    alert('error al recibir datos')
                    return
                }
                const notas = response.data.data;
                setTitulo(notas.titulo);
                setTexto(notas.texto);
                setColor(notas.color);
                setEstado(notas.estado);



            })

    }

    const enviarDatos = (e) => {
        e.preventDefault();
        if (!titulo) {
            alert('El titulo es obligatorio')
            return
        }
        const notas = {
            titulo, texto, color, estado, user_id

        };
        // console.log(persona);
        if (id == 0) {
            enviarInsertar(notas);
        } else {
            enviarActualizar(notas, id);
        }

    }
    const enviarInsertar = (notas) => {
        console.log(notas);
        axios.post("http://localhost:8000/api/notas/", notas,
        )
            .then(response => {

                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push("/notaIndexCreador");

            });
    }



    const enviarActualizar = (notas, id) => {
        axios.put("http://localhost:8000/api/notas/" + id, notas,
        )
            .then(response => {
                // console.log('datos actualizados', response.data);
                if (response.data.res !== 'success') {
                    alert('error al enviar datos')
                    return
                }
                history.push("/notaIndexCreador");

            });
    }
    return (
        <>
            <Row className="mt-5" style={{ padding: 16, alignItems:"center", justifyContent:"center" }}>
                <Col xs={{ span: 6, offset: 2 }} style={{ background: "#ddd", borderRadius: "8px", maxWidth:"600px", width:"90%", display:"inline-block" }}>
                    <br />
                    <div>
                        <p align="center">Nueva Nota </p>
                    </div>
                    <br />
                    <Form onSubmit={enviarDatos}>
                        <Form.Group>
                            
                            <Form.Label></Form.Label>
                            <MiInput id="titulo" className="form-control" placeholder="Titulo" value={titulo} onChange={(event) => { setTitulo(event.target.value) }} style={{
                                width: "80%",
                                height: "30px",
                                // borderRadius: "4px",
                            }} />
                            <br />
                            <MiInput id="texto" className="form-control" placeholder="Descripcion..." value={texto} onChange={(event) => { setTexto(event.target.value) }} style={{
                                width: "80%",
                                height: "50px",
                                textAlign: "center",
                                // borderRadius: "4px",
                            }} />
                            {/* <Form.Control as="textarea" rows="3" name="address" value={texto} onChange={(event) => { setTexto(event.target.value) }} /> */}
                            {/* <h5 align="center"> Cambiar color </h5> */}
                            {/* <MiInput type="color" className="form-control" placeholder="Color" value={color} onChange={(event) => { setColor(event.target.value) }} /> */}
                        </Form.Group>
                        <br />
                        <Button variant="outlined" type="submit">ACEPTAR</Button>
                        <br />
                        <br />
                    </Form>
                </Col>
            </Row>
        </>
    )
}
