import { useState, useEffect } from "react";



function Formulario({ agregarItem }) {
    const [texto, setTexto] = useState("");
    const [nombre, setNombre] = useState("");
    const [categoriaID, setCategoriaID] = useState("");
    const [estado, setEstado] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const [notas, setNotas] = useState("");




    return (
        <div>
            <h1>Formulario</h1>
            <form onSubmit={(e) => {

                e.preventDefault();
                const nuevoItem = {
                    id: crypto.randomUUID(),
                    nombre,
                    categoriaID,
                    estado,
                    puntuacion,
                    notas,
                }
                agregarItem(nuevoItem);

                setNombre("");
                setCategoriaID("");
                setEstado("");
                setPuntuacion(0)
                setNotas("")
            }}>
                <div>
                    <p>nombre</p>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <p>tipo</p>
                    <select
                        value={categoriaID}
                        onChange={(e) => setCategoriaID(e.target.value)}
                    >
                        <option>playa</option>
                        <option>ciudad</option>
                        <option>bosque</option>
                    </select>
                </div>

                <div>
                    <p>estado</p>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option>pendiente</option>
                        <option>visitado</option>
                    </select>
                </div>

                <div>
                    <p>puntuacion</p>
                    <input
                    type="number"
                    min="0"
                    max="10"
                    value={puntuacion}
                    onChange={(e) => setPuntuacion(e.target.value)}
                />
                </div>

                <div>
                    <p>notas</p>
                    <input
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                    />
                </div>
                
                <button type="submit">
                    enviar
                </button>
            </form>
        </div>
    );
}

export default Formulario;
