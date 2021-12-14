const initialHome = {
    datosSesion: {
      sesionIniciada: false,
    },
  };
  const userReducer = (state = initialHome, action) => {
    switch (action.type) {
      case "CERRAR_SESION": {
        const datosSesion = Object.assign({}, state.datosSesion);
        datosSesion.sesionIniciada = false;
        console.log("cerro sesion");
        return {
          ...state,
          datosSesion: datosSesion,
        };
      }
      case "INICIAR_SESION": {
        const datosSesion = Object.assign({}, state.datosSesion);
        datosSesion.sesionIniciada = true;
        console.log("inicio sesion");
        return {
          ...state,
          datosSesion: datosSesion,
        };
      }
      default:
        return state;
    }
  };
  export default userReducer;