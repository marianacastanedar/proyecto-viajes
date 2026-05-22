import { useState, useEffect } from "react";



function Formulario({ agregarItem }) {
    const [pais, setPais] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [categoriaID, setCategoriaID] = useState("");
    const [estado, setEstado] = useState("");
    const [puntuacion, setPuntuacion] = useState(0);
    const [notas, setNotas] = useState("");
    //const [activo, setActivo] = useState(true); 
    //falta fecha registro, fecha actividad, atributos, activo

    return (
        <div>
            <h1>Formulario</h1>
            <form onSubmit={(e) => {

                e.preventDefault();
                const nuevoItem = {
                    id: crypto.randomUUID(),
                    pais,
                    ciudad,
                    categoriaID,
                    estado,
                    puntuacion,
                    notas,
                }
                agregarItem(nuevoItem);

                setPais("");
                setCiudad("");
                setCategoriaID("");
                setEstado("");
                setPuntuacion(0)
                setNotas("")
            }}>
                <div>
                    <p>Nombre de País</p>
                    <input
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                    />
                </div>

                <div>
                    <p>Nombre de ciudad</p>
                    <input
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>

                <div>
                    <p>Categoría</p>
                    <select
                        value={categoriaID}
                        onChange={(e) => setCategoriaID(e.target.value)}
                    >
                        <option value="" disabled>Selecciona una categoría</option> //para que salga seleccionar pero disabled para que no se seleccione
                        <option>Ciudad</option>
                        <option>Naturaleza</option>
                        <option>Playa</option>
                        <option>Histórico</option>
                        <option>Gastronómico</option>
                    </select>
                </div>

                <div>
                    <p>estado</p>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="" disabled>Selecciona un estado</option>
                        <option>Planeado</option>
                        <option>Visitado</option>
                    </select>
                </div>

                <div>
                    <p>Ingrese puntuación (1-10)</p>
                    <input
                    type="number"
                    min="0"
                    max="10"
                    value={puntuacion}
                    onChange={(e) => setPuntuacion(e.target.value)}
                />
                </div>

                <div>
                    <p>Agregue notas</p>
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
