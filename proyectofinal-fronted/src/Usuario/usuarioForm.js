import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link1 from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import {
  MiInput,
  MiBoton,
  MiSelect,
  MiGroup,
  MiColumnaInput,
  MiColumnaSelect,
  MibarHigh,
} from "../component";
import swal from "sweetalert";

export const UsuarioForm = (props) => {
  let history = useHistory();
  
  let { id } = props.match ? props.match.params : { id: 0 };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (id != 0) {
      cargarUsuario(id);
    }
  }, []);

  const cargarUsuario = (id) => {
    axios
      .get("http://localhost:8000/api/usuarios/" + id)
      .then((response) => {
        if (response.data.res !== "success") {
          alert("error al recibir datos");
          return;
        }
        const usuario = response.data.data;
        setName(usuario.name);
        setEmail(usuario.email);
        setPassword(usuario.password);
      });
  };
  const enviarDatos = (e) => {
    e.preventDefault();
    const usuario = {
      name,
      email,
      password,
    };
    if (id == 0) {
      enviarInsertar(usuario);
    } else {
      enviarActualizar(usuario, id);
    }
  };
  const enviarInsertar = (usuario) => {
    axios
      .post("http://localhost:8000/api/register", usuario
      )
      .then(
        (response) => {
          if (response.data.res !== "success") {
            alert("error al enviar datos");
            return;
          }
          swal(
            "Buen Trabajo!",
            "Su registro  fue añadido correctamente! Por favor registre su curriculums",
            "success"
          );
          history.push("/login");
        },
        (error) => {
          if (error.response.status === 401) {
            history.push("/login");
            return;
          }
          if (error.response.status === 403) {
            history.push("/principal");
            return;
          }
          return error;
        }
      );
  };
  const enviarActualizar = (usuario, id) => {
    axios
      .put("http://localhost:8000/api/usuarios/" + id, usuario)
      .then(
        (response) => {
          if (response.data.res !== "success") {
            alert("error al enviar datos");
            return;
          }
          swal(
            "Buen Trabajo!",
            "El usuario fue actualizada Correctamente!",
            "success"
          );
          history.push("/usuarioIndex");
        },
        (error) => {
          if (error.response.status === 401) {
            history.push("/login");
            return;
          }
          if (error.response.status === 403) {
            history.push("/principal");
            return;
          }
          return error;
        }
      );
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <form className={classes.form} onSubmit={enviarDatos} noValidate>
            <input id="id" type="hidden" value={id} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  variant="outlined"
                  required=""
                  fullWidth
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,50}"
                  maxLength="250"
                  id="name"
                  label="Nombre"
                  autoFocus
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  maxLength="250"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Desea recibir sugerencias de trabajo."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registro
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link className="nav-link" to="/login" variant="body2">
                  Ya tienes una cuenta creada? Iniciar Sesion
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};
