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
import swal from "sweetalert";
import ItemNota from '../Item/ItemNota';
export const NotaIndexCreador = (props) => {
  let id = localStorage.getItem("user");
  let history = useHistory();
  const [listaNotas, setListaNotas] = useState([]);
  const [listaNotas2, setListaNotas2] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaCat, setBusquedaCat] = useState("");
  const [titulo, setTitulo] = useState("");
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [color, setColor] = useState("");
  const [estado, setEstado] = useState("");
  const [listaItem, setListaItem] = useState([]);
  const [listaEtiquetas, setListaEtiquetas] = useState([]);

  const access_token = localStorage.getItem("access_token");
  const headers = {
    Authorization: " Bearer " + access_token,
  };

  useEffect(() => {
    traerListaItem()
    traerListaEtiquetas()
    if (id != 0) {
      traerNotas(id);
    }
  }, []);


  const traerNotas = (id) => {
    console.log("http://localhost:8000/api/notaIdCreador/" + id)
    axios.get("http://localhost:8000/api/notaIdCreador/" + id, { headers })
      .then(
        (response) => {
          let respuesta = response.data;
          console.log(respuesta.data);
          setListaNotas(respuesta.data);
        },
        (error) => {
          if (error.response.status === 401) {
            history.push("/login");
            return;
          }
          if (error.response.status === 403) {
            history.push("/notas");
            return;
          }
          return error;
        }
      );
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
          traerNotas();
        } else {
          alert('Hubo un error al eliminar');
        }
      }, (error) => {

      });
  }




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




  //// REPARACION
  const enviarDatos = (e) => {
    e.preventDefault();
    const nota = {
      titulo

    };
    if (id == 0) {
      enviarInsertar(nota);
    } else {
    }
  };
  const enviarInsertar = (nota) => {
    axios
      .post("http://localhost:8000/api/BuscarNota", nota)
      .then((response) => {
        if (response.data.res !== "success") {
          swal(
            "Lo siento 😱!",
            "Verifique sus datos antes de enviar",
            "warning"
          );
          return;
        }
        swal("Buen Trabajo!", "Su busqueda fue Correctamente!", "success");
        let respuesta = response.data;
        console.log(respuesta.data);
        console.log("PRUEBA DE BUSQUEDA");
        setListaNotas(respuesta.data);
      });
  };



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
      console.log("esto me obtiene", bnotas);
      console.log("nombre de la etiqueta por buscar")
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
        console.log(respuesta.data);
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


  const getNotas = () => {
    var lista = [];
    listaNotas.map((item) => {
      if (busqueda) {
        if ((item.titulo + "").indexOf(busqueda + "") < 0) return null;
      }
      if (busquedaCat) {
        if ((item.nombre + "").indexOf(busquedaCat + "") < 0) return null;
      }
      lista.push(item)
    })
    return lista.map((item) => {
      return <Card style={{ backgroundColor: "#eee", width: '20rem', cursor: 'pointer', display: "inline-block", position: "relative", borderRadius: "9px", margin: "8px", }}
      >
        <Card.Header key={"item-" + item.id} >{item.titulo}   </Card.Header>
        <div>
          <Card.Body>
            <Card.Title style={{ fontSize: 10 }}>{item.texto} </Card.Title>
          </Card.Body>
        </div>

        <Card.Text>
          {item.nombre}
        </Card.Text>

        <div style={{
          position: "absolute",
          top: -8,
          right: 8,
          zIndex: 999,
        }}>
          <Card.Text>
            <DropdownButton
              title="::"
              style={{
                // position: "absolute",
                zIndex: 999,
              }}
            >
              <div style={{
                position: "absolute",
                zIndex: 999,
                display: "flex",
                background: "#ddd",
                borderRadius: "8px",
                padding: 4,
              }}>
                <Dropdown.Item onClick={() => { eliminarNotas(item.id) }}>Eliminar</Dropdown.Item>
                <hr/>
                <Link className="nav-link" to={"/notaetiqueta/" + item.id}>Añadir</Link>
                <hr/>
                <Link to={"/nota/edit/" + item.id} className="nav-link" >Editar</Link>
                {/* <Dropdown.Item onClick={() => { eliminarEtiquetas(item.id) }}>Quitar Categoria </Dropdown.Item> */}
              </div>
            </DropdownButton>
          </Card.Text>
        </div>
        <hr />
        <div>
          <ItemNota key_nota={item.id} />
        </div>
      </Card>
    }
    )
  }


  return (
    <>
      <Form onSubmit={BuscarEtiqueta} className="navbar-form" role="search">


        <h2 align="center"> Buscador </h2>


        <span></span>
        <select className="material-control"
          value={busquedaCat}
          data-toggle="tooltip"
          data-placement="top"
          title="Elige su categoria"
          id="nombre"
          onChange={(event) => {
            setBusquedaCat(event.target.value);
          }}
        >
          <option value={""}>Selecciona una categoria</option>
          {listaEtiquetas.map((item) => (
            <option key={item.id} value={item.nombre}>
              {item.nombre}
            </option>
          ))}
        </select>


      </Form>

      <br />


      {/* <Form onSubmit={enviarDatos} className="navbar-form" role="search">
        <input value={titulo} size="sm" className="mr-sm-2" type="text" id="titulo" onChange={(event) => { setTitulo(event.target.value) }} placeholder="Buscar"></input>


        <Button size="sm" variant="dark" type="submit" onClick={() => {
          enviarInsertar();
        }}
        > Buscar
        </Button>
      </Form> */}

      <input value={titulo} size="sm" className="mr-sm-2" type="text" id="titulo" value={busqueda} onChange={(event) => { setBusqueda(event.target.value) }} placeholder="Buscar"></input>
      <div className="container-fluid">
        {getNotas()}
      </div>
      <>
      </>
    </>
  )
}