import { useState, useEffect } from "react";


function App() {
    /*
    const [items, setItems] = useState(
        () => JSON.parse(localStorage.getItem('items') || '[]')
    );
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
    }, [items]);
    */

    //const [items, setItems] = useState(["hola", "Andres"]);
    const [items, setItems] = useState(
        () => JSON.parse(localStorage.getItem('items') || ["hola"])
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
            <p>hola</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                agregarItem(texto);
                setTexto("");
            }}>
                <input
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                />
                <button type="submit">
                    enviar
                </button>
            </form>

            <button onClick={() => agregarItem("HOLA")}>
                AGREGAR UN HOLA
            </button>
            {items.map(item =>
                <p key={item}>{item}</p>
            )}
        </div>

    );
    
}

export default App;
