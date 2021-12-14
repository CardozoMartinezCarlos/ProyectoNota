import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const MiLabel = (props) => {
    return (
        <div>
            <Form.Label {...props}></Form.Label>
        </div>
    )
};
export const Modal = (props) => {
    return (
        <div>
            <Form.Label {...props}></Form.Label>
        </div>
    )
};

export const MiBoton = (props) => {
    return (
        <div>
            <Button variant="primary" type="submit" {...props}></Button>
        </div>
    )
}
export const MiInput = (props) => {
    return (
        <div className="contenedor-input">
            <Form.Control {...props} />
        </div>
    )
}
export const MiTextArea = (props) => {
    return (
        <div>
            <Form.Area {...props}></Form.Area>
        </div>
    )
};




// const HolaMundo = ({nombre}) => {
//   return (
//   <div>Hola mi nombre es {nombre}</div>
//   )
// }

export const MiSelect = (props) => {
    return (
      <>
        <select className="tooltips-general material-control" {...props}></select>
      </>
    );
  };
  
  export const MiColumnaSelect = (props) => {
    return (
      <>
        <div className="col-xs-12" {...props}></div>
      </>
    );
  };
  export const MiColumnaInput = (props) => {
    return (
      <>
        <div className="col-xs-12 col-sm-6" {...props}></div>
      </>
    );
  };
  
  export const MiGroup = (props) => {
    return (
      <>
        <div className="group-material" {...props}></div>
      </>
    );
  };
  
  export const MibarHigh = (props) => {
    return (
      <>
        <span className="highlight"></span>
        <span className="bar" {...props}></span>
      </>
    );
  };