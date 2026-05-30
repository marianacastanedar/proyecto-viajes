import { useState, useRef, useEffect } from "react";
import { CATEGORIAS } from "../utils/categorias";



function Formulario({ agregarItem }) {
    const [pais, setPais] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [estado, setEstado] = useState("");
    const [puntuacion, setPuntuacion] = useState("");
    const [notas, setNotas] = useState("");
    const [nombre, setNombre] = useState("")
    const [continente, setContinente] = useState("")
    //const [activo, setActivo] = useState(true);

    const refInputNombre = useRef(null);

    // ctr N
    useEffect(() => {
        const atajo = (e) => {
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                refInputNombre.current?.focus();
            }
        };
        window.addEventListener('keydown', atajo);
        return () => window.removeEventListener('keydown', atajo);
    }, []);

    return (
        <div className="formulario">
            <h1 className="tituloForm">Formulario</h1>
            <form className="camposForm" onSubmit={(e) => {

                e.preventDefault();
                const nuevoItem = {
                    id: crypto.randomUUID(),
                    nombre,
                    categoriaId,
                    estado,
                    puntuacion: puntuacion !== "" ? Number(puntuacion) : null,
                    fechaRegistro: new Date().toISOString(),
                    fechaActividad: new Date().toISOString(),
                    notas,
                    atributos: { pais, ciudad, continente },
                    activo: true
                }
                agregarItem(nuevoItem)
                refInputNombre.current?.focus();

                setPais("");
                setCiudad("");
                setCategoriaId("");
                setEstado("");
                setPuntuacion("")
                setNotas("")
                setNombre("")
                setContinente("")
            }}>
                <div className="campo">
                    <p className="etiqueta">Etiqueta del viaje (nombre)</p>
                    <input
                        className="entrada"
                        ref={refInputNombre}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <p className="etiqueta">Continente</p>
                    <input
                        className="entrada"
                        value={continente}
                        onChange={(e) => setContinente(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <p className="etiqueta">País</p>
                    <input
                        className="entrada"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <p className="etiqueta">Nombre de ciudad</p>
                    <input
                        className="entrada"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>



                <div className="campo">
                    <p className="etiqueta">Categoría</p>
                    <select
                        className="selector"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                    >
                        <option value="" disabled>Selecciona una categoría</option>
                        {CATEGORIAS.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="campo">
                    <p className="etiqueta">estado</p>
                    <select
                        className="selector"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                    >
                        <option value="" disabled>Selecciona un estado</option>
                        <option>Planeado</option>
                        <option>Visitado</option>
                    </select>
                </div>

                <div className="campo">
                    <p className="etiqueta">Ingrese puntuación (1-10)</p>
                    <input
                        className="entrada"
                        type="number"
                        min="0"
                        max="10"
                        value={puntuacion}
                        onChange={(e) => setPuntuacion(e.target.value)}
                    />
                </div>

                <div className="campo">
                    <p className="etiqueta">Agregue notas</p>
                    <input
                        className="entrada"
                        value={notas}
                        onChange={(e) => setNotas(e.target.value)}
                    />
                </div>

                <button type="submit" className="botonEnviar">
                    enviar
                </button>
            </form>
        </div>
    );
}

export default Formulario;

