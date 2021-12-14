import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { MiInput, MiLabel, MiBoton } from '../component';
import '../css/style.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export const NotaIndex = (props) => {

    let { id } = props.match ? props.match.params : { id: 0 };
    const [listaNotas, setListaNotas] = useState([]);
    const [listaNotasEtiqueta, setListaNotas1] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [nombre, setNombre] = useState("");
    const [texto, setTexto] = useState("");
    const [color, setColor] = useState("");
    const [estado, setEstado] = useState("");
    const [listaItem, setListaItem] = useState([]);
    const [listaEtiquetas, setListaEtiquetas] = useState([]);
    const [etiqueta_id, setEtiquetaid] = useState("");



    const traerListaNotas = (event) => {
        axios.get('http://localhost:8000/api/indexNota')
            .then(response => {
                let respuesta = response.data
                console.log(respuesta.data)
                setListaNotas(respuesta.data)

            });
    }




    const traerEmpleos = (id) => {
        axios
            .get("http://localhost:8000/api/indexNota/" + id,)
            .then((response) => {
                let respuesta = response.data.data;
                console.log(respuesta);
                setListaNotas1(respuesta);
            });
    };

    const eliminarNotas = (id) => {
        const confirmacion = window.confirm('Está seguro que desea eliminar?');
        if (!confirmacion) {
            return;
        }

        axios.delete('http://localhost:8000/api/notas/' + id,
        )
            .then(response => {
                if (response.data.res) {
                    alert('Eliminado Correctamente!');
                    traerListaNotas();
                } else {
                    alert('Hubo un error al eliminar');
                }
            }, (error) => {

            });
    }


    useEffect(() => {
        traerListaItem()
        traerListaEtiquetas()
        traerListaNotas()

    }, [])

    const traerListaItem = (event) => {
        axios.get('http://localhost:8000/api/items',
        )
            .then(response => {
                let respuesta = response.data
                console.log(respuesta.data)
                setListaItem(respuesta.data)
            }
            );
    }
    const eliminarItem = (id) => {
        const confirmacion = window.confirm('Está seguro que desea eliminar?');
        if (!confirmacion) {
            return;
        }

        axios.delete('http://localhost:8000/api/items/' + id,
        )
            .then(response => {
                if (response.data.res) {
                    alert('Eliminado Correctamente!');
                    traerListaItem();
                } else {
                    alert('Hubo un error al eliminar');

                }

            });
    }





    const Buscarnotas = (e) => {
        e.preventDefault();

        const bnotas = {
            titulo, texto, color
        };

        if (id == 0) {
            buscador(bnotas);
        } else {
        }
    };
    const buscador = (bnotas) => {

        axios.post('http://localhost:8000/api/BuscarNota', bnotas)
            .then(response => {
                if (response.data.res !== "success") {
                    console.log("Error traer notas")
                    return;
                }

                let respuesta = response.data;
                //console.log(respuesta.categoria);
                setListaNotas(respuesta.data);

            });
    }




    const eliminarEtiquetas = (id) => {
        const confirmacion = window.confirm('Está seguro que desea eliminar?');
        if (!confirmacion) {
            return;
        }

        axios.delete('http://localhost:8000/api/etiquetas/' + id
        )
            .then(response => {
                if (response.data.res) {
                    alert('Eliminado Correctamente!');
                    traerListaEtiquetas();
                } else {
                    alert('Hubo un error al eliminar');
                }

            });
    }


    const BuscarEtiqueta = (e) => {
        e.preventDefault();

        const bnotas = {
            nombre
        };

        if (id == 0) {
            buscar(bnotas);
            console.log(bnotas);
        } else {
        }
    };
    const buscar = (bnotas) => {

        axios.post('http://localhost:8000/api/BuscarEtiqueta', bnotas)
            .then(response => {
                if (response.data.res !== "success") {
                    console.log("Error traer notas")
                    return;
                }

                let respuesta = response.data;
                //console.log(respuesta.categoria);
                setListaNotas(respuesta.data);

            });
    }





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
        <>
            <Form onSubmit={BuscarEtiqueta} className="navbar-form" role="search">


                <h2 align="center"> Buscador </h2>


                <span></span>
                <select className="material-control"
                    value={nombre}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Elige su categoria"
                    id="nombre"
                    onChange={(event) => {
                        setNombre(event.target.value);
                    }}
                >
                    <option>Selecciona una categoria</option>
                    {listaEtiquetas.map((item) => (
                        <option key={item.id} value={item.nombre}>
                            {item.nombre}
                        </option>
                    ))}
                </select>

                <Button size="sm" variant="dark" type="submit" onClick={() => {
                    buscar();
                }}
                > Buscar
                </Button>
            </Form>



            <Form onSubmit={Buscarnotas} className="navbar-form" role="search">
                <input value={titulo} size="sm" className="mr-sm-2" type="text" id="titulo" onChange={(event) => { setTitulo(event.target.value) }} placeholder="Buscar"></input>
                <input value={texto} size="sm" className="mr-sm-2" type="text" id="texto" onChange={(event) => { setTexto(event.target.value) }} placeholder="Buscar"></input>
                <input value={color} size="sm" className="mr-sm-2" type="color" id="color" onChange={(event) => { setColor(event.target.value) }} placeholder="Buscar"></input>

                <Button size="sm" variant="dark" type="submit" onClick={() => {
                    buscador();
                }}
                > Buscar
                </Button>



            </Form>


            <div className="container-fluid">
                {/*  <Link
          className="nav-link text-center all-tittles"
          to="/nota/create"
        >
          Añadir nota
        </Link> */}
            </div>


            <article>


                {listaNotas.map(item =>
                    <Card key={"item-" + item.id} style={{ backgroundColor: item.color, width: '18rem', cursor: 'pointer', display: "flex" }}
                        className="mb-2"
                    >
                        <Link to={"/nota/edit/" + item.id} className='nav-link'>
                            <Card.Header key={"item-" + item.id} >{item.titulo}   </Card.Header>
                            <Card.Body>
                                <Card.Title>{item.texto} </Card.Title>
                                <Card.Title>{item.estado} </Card.Title>
                            </Card.Body>


                        </Link>
                        <Card.Text>
                            <DropdownButton
                                style={{ backgroundColor: item.color }}
                                title="">
                                <Dropdown.Item onClick={() => { eliminarNotas(item.id) }}>Eliminar Nota</Dropdown.Item>
                                <Link className="nav-link" to={"/notaetiqueta/" + item.id}>Añadir Categoria</Link>
                                <Link to={"/nota/edit/" + item.id} className="nav-link" >Editar</Link>
                                <Dropdown.Item onClick={() => { eliminarEtiquetas(item.id) }}>Quitar Categoria </Dropdown.Item>
                            </DropdownButton>
                        </Card.Text>

                        <Card.Text>

                            {item.nombre}
                        </Card.Text>
                    </Card>

                )}
            </article>
            <>
                <article>
                    {listaItem.map(item =>
                        <Card style={{ backgroundColor: item.color, width: '18rem', cursor: 'pointer' }}
                            className="mb-2"
                        >

                            <Link to={"/items/edit/" + item.id} className='nav-link'>
                                <Card.Header key={"item-" + item.id} >{item.texto}   </Card.Header>

                                <Card.Body>
                                    <Card.Title>{item.estado} </Card.Title>

                                </Card.Body>


                            </Link>
                            <Card.Text>
                                <DropdownButton
                                    style={{ backgroundColor: item.color }}
                                    title=":"

                                >
                                    <Dropdown.Item onClick={() => { eliminarItem(item.id) }}>Eliminar</Dropdown.Item>


                                    <MiInput type="color" className="form-control" placeholder="Color" value={color} onChange={(event) => { setColor(event.target.value) }} />
                                </DropdownButton>
                            </Card.Text>
                        </Card>
                    )}
                </article>
            </>
        </>
    )
}