import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from "react-router-dom";



export const UsuarioIndex = (props) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token === null) {
      history.push("/login");
    }

    let history = useHistory();
    
    const headers = {
        Authorization: " Bearer " + access_token,
      };
  
  
    const [listausuarios, setListaUsuarios] = useState([]);


    useEffect(() => {
        traerListaUsuarios()
    },[])

    const traerListaUsuarios = (event) => {
        axios.get('http://localhost:8000/api/usuarios', { headers })
            .then(response => {
                let respuesta = response.data
                console.log(respuesta.data)
                setListaUsuarios(respuesta.data)
            }
      );
    }
    const eliminarusuarios = (id) => {
        const confirmacion = window.confirm('Está seguro que desea eliminar?');
        if (!confirmacion) {
            return;
        }

        axios.delete('http://localhost:8000/api/usuarios/' + id, { headers })
            .then(response => {
                if (response.data.res) {
                    alert('Eliminado Correctamente!');
                    traerListaUsuarios();
                } else {
                    alert('Hubo un error al eliminar');
                }
            });
    }


return (
    <div className="mt-5">
        
        {/* <a onClick={traerPersonas} href="#">Traer Personas</a> */}
        <Table striped bordered hover variant="dark" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>email</th>
                    <th>password</th>
                   

                   
                </tr>
            </thead>
            <tbody>
                {listausuarios.map(item =>
                    <tr key={"item-" + item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombres}</td>
                        <td>{item.apellidos}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                      
                
                        <td>
                            <Button href={"/user/edit/" + item.id} variant="primary">Editar</Button>
                        </td>
                        <td>
                            <Button onClick={() => { eliminarusuarios(item.id) }} variant="danger">Eliminar</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
)
}