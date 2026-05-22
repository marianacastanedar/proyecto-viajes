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

    
    return (
        
        <div>
            <Formulario agregarItem={agregarItem} />
            <VerItem items={items} />

        </div>

        
    );
}

export default App;

