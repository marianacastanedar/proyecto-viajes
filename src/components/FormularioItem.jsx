import { useState, useEffect } from "react";



function Formulario({agregar}) {
    const [texto, setTexto] = useState("");
    return (
        <div>
            <h1>MY APP</h1>

            <p>hola</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                agregar(texto);
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

            <button onClick={() => agregar("HOLA")}>
                AGREGAR UN HOLA
            </button>
            
        </div>
    );
}

export default Formulario;