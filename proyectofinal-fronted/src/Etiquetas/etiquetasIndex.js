import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory,Link } from "react-router-dom";


export const EtiquetasIndex = (props) => {
    let history = useHistory();

    
  
  
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


return (
    <div className="mt-5">
          <h2 align="center">Mi Lista de Categorias</h2>
        {/* <a onClick={traerPersonas} href="#">Traer Personas</a> */}
        <Table striped bordered hover variant="dark" >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>nombre</th>
                    

                   
                </tr>
            </thead>
            <tbody>
                {listaEtiquetas.map(item =>
                    <tr key={"item-" + item.id}>
                        <td>{item.id}</td>
                        <td>{item.nombre}</td>
                        
                      

                        
                        <td>
                            <Link to={"/etiquetas/edit/" + item.id} className="btn btn-primary">Editar</Link>
                        </td>
                        <td>
                            <Button onClick={() => { eliminarEtiquetas(item.id) }} variant="danger">Eliminar</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    </div>
)
}