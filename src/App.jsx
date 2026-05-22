import { useState, useEffect } from "react";
import Formulario from "./components/FormularioItem";
import VerItem from "./components/ListaItems"

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
    const [texto, setTexto] = useState("");
    const [contador, setContador] = useState(0);

    const sumar = (num) => {
        setContador(contador+num);
    }
    
    
    return (
        
        <div>
            <Formulario agregar={agregarItem} />
            <VerItem items={items} />
            <p>{contador}</p>
            <button onClick={()=> sumar(1)}>boton</button>
        </div>

        
    );
    
}

export default App;
