import Axios from 'axios';
import React, { useState, useEffect } from 'react';

const ItemNota = (props) => {
    const [listaItem, setListaItem] = useState(null);
    const [text, setText] = useState(null);


    useEffect(() => {
        traerListaItem()
    }, [])

    const traerListaItem = (event) => {
        Axios.get('http://localhost:8000/api/items',
        )
            .then(response => {
                let respuesta = response.data
                setListaItem(respuesta.data)
            });
    }
    const getLista = () => {
        if (!listaItem) return <p style={{ fontSize: 12 }}>Cargando items...</p>;
        return listaItem.map((obj) => {
            if (obj.nota_id != props.key_nota) return null;
            return <div style={{ flexDirection: "row", height: 30 }}>
                <input type={"checkbox"}
                    checked={obj.estado != "1"}
                    onChange={(evt) => {
                        var estado = evt.currentTarget.checked ? "0" : "1";
                        Axios.put('http://localhost:8000/api/items/' + obj.id,
                            {
                                ...obj,
                                estado: estado
                            }
                        )
                            .then(response => {
                                let respuesta = response.data
                                listaItem.find((item) => item.id == obj.id).estado = estado;
                                setListaItem([...listaItem])
                            });
                    }} />
                <span>{obj.texto}</span>
            </div>
        })
    }
    return <div>
        <div style={{
            width: '92%',
            textAlign: "start"
        }}>
            {getLista()}
        </div>
        <div>
            <input type="text" id={"nota"} value={text} onChange={(evt) => { setText(evt.target.value) }} />
            <button onClick={() => {
                // var nota = document.getElementById("nota").value;
                var value = {
                    texto: text,
                    estado: "1",
                    orden: "nose",
                    nota_id: props.key_nota,
                };
                console.log(JSON.stringify(value));
                Axios.post('http://localhost:8000/api/items', value).then(response => {
                    let respuesta = response.data
                    listaItem.push(respuesta.data)
                    setText("");
                    setListaItem([...listaItem])
                });
            }}>OK</button>
        </div>
    </div >;
}
export default ItemNota;