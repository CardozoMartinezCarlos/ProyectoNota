import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import { MiInput, MiLabel, MiBoton } from '../component';
import Card from 'react-bootstrap/Card';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
export const ItemIndex = (props) => {
    let history = useHistory();



    const [listaItem, setListaItem] = useState([]);

    useEffect(() => {
        traerListaItem()
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


    return (
        <>




            <article>


                {listaItem.map(item =>

                    <Card style={{ backgroundColor: item.color, width: '18rem', cursor: 'pointer' }}
                        className="mb-2"
                    >
                        <div className="container-fluid">
                            <Link className="nav-link text-center all-tittles" to="/items/create">
                                Añadir nueva lista
                            </Link>
                        </div>
                        <Link to={"/items/edit/" + item.id} className='nav-link'>
                            <Card.Header key={"item-" + item.id} >{item.texto}   </Card.Header>
                            <Card.Body>
                                <Card.Title>{item.estado} </Card.Title>

                            </Card.Body>


                        </Link>
                        <Card.Text>
                            <DropdownButton
                                style={{ backgroundColor: item.color, }}
                                title=":">
                                <Dropdown.Item onClick={() => { eliminarItem(item.id) }}>Eliminar</Dropdown.Item>


                            </DropdownButton>
                        </Card.Text>
                    </Card>
                )}
            </article>


        </>
    )
}

























