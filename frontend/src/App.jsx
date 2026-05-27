import { useState, useEffect } from "react";
import Formulario from "./components/FormularioItem";
import ListaItems from "./components/ListaItems"

function App() {
    const [items, setItems] = useState(
        () => JSON.parse(localStorage.getItem('items') || '[]')
    );
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);

    const agregarItem = (nuevo) => {
        setItems([...items, nuevo]);
    }
    /*
  const [activo, setActivo] = useState(true); 

    const archivarItem = (item) => {
        item.setActivo = false
    } */

    const archivarItem = (itemID) => {
        const listaActualizada = items.map(item => {
            if (item.id === itemID) {
                return {
                    ...item,
                    activo: false
                };
            } else {
                return item;
            }
        });
        setItems(listaActualizada);
};
    /*
    function mostrarSoloActivos() {
        return (
            <div>

            {items
                .filter(item => item.activo)
                .map(item => (

                    <div key={item.id}>
                        <p>{item.nombre}</p>
                    </div>

                ))
            }
        </div>
        )
    } */

    return (
        <div>
            <Formulario agregarItem={agregarItem} />
            <ListaItems items={items} archivarItem={archivarItem} />
        </div>
    );
}

export default App;

