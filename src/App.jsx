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

    
    return (
        <div>
            <Formulario agregarItem={agregarItem} />
            <ListaItems items={items} />
        </div>
    );
}

export default App;

