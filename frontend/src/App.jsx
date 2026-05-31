import { useReducer, useEffect, useContext, useRef, useMemo } from "react";
import { StorageContext } from "./context/StorageContext";
import { useTheme } from "./context/ThemeProvider";
import Formulario from "./components/FormularioItem";
import ListaItems from "./components/ListaItems";
import { viajesReducer, estadoInicial } from "./reducers/viajesReducer";
import { CATEGORIAS } from "./utils/categorias";

function App() {
    const [estado, dispatch] = useReducer(viajesReducer, estadoInicial);
    const { obtenerItems, guardarItem, eliminarItem, modo, setModo, cargando, error } = useContext(StorageContext);
    const { tema, toggleTema } = useTheme();
    const intervaloRef = useRef(null);

    useEffect(() => {
        obtenerItems().then(lista => dispatch({ type: 'hidratar', payload: lista }));
    }, [obtenerItems]);

    // vuelve a cargar cada 30s en la api
    useEffect(() => {
        if (modo === 'api') {
            intervaloRef.current = setInterval(() => {
                obtenerItems().then(lista => dispatch({ type: 'hidratar', payload: lista }));
            }, 30000);
        }
        return () => clearInterval(intervaloRef.current);
    }, [modo, obtenerItems]);

    // tema con el atajo de ctrl T -- para pruebas lo dejé como ctrl k por que me abria otra pestaña
    useEffect(() => {
        const handler = (e) => {
            const enInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
            if (enInput) return;
            if (e.key === 'k' || e.key === 'K') toggleTema();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [toggleTema]);

    // lista que ve su se cambia la lista o filtro
    const itemsVisibles = useMemo(() => {
        let lista = estado.lista.filter(i => i.activo);
        if (estado.busqueda) {
            lista = lista.filter(i => i.nombre.toLowerCase().includes(estado.busqueda.toLowerCase()));
        }
        if (estado.filtroCategoria !== 'todas') {
            lista = lista.filter(i => i.categoriaId === estado.filtroCategoria);
        }
        if (estado.filtroEstado !== 'todos') {
            lista = lista.filter(i => i.estado === estado.filtroEstado);
        }
        return lista;
    }, [estado.lista, estado.busqueda, estado.filtroCategoria, estado.filtroEstado]);

    const agregarItem = async (nuevo) => {
        await guardarItem(nuevo);
        dispatch({ type: 'agregar', payload: nuevo });
    };

    const archivarItem = async (itemID) => {
        await eliminarItem(itemID);
        dispatch({ type: 'eliminar', payload: itemID });
    };

    return (
        <div className="fondo-pantalla">

            <div className="izq">
                <div>
                    <h1>Bitacora de Viajes</h1>
                    <div>
                        <span>Modo actual: {modo}</span>
                        <hr></hr>
                        <button onClick={() => setModo(modo === 'api' ? 'local' : 'api')}>
                            Cambiar a {modo === 'api' ? 'local' : 'api'}
                        </button>
                        <button onClick={toggleTema}>
                            {tema === 'claro' ? '🌙 Oscuro' : '☀️ Claro'}
                        </button>
                        {error && <p>Error: {error}</p>}
                        {cargando && <p>Cargando...</p>}
                    </div>
                </div>

                <Formulario agregarItem={agregarItem} />
            </div>

            <div className="der">
                {/* filtros */}
                <div className="filtros">
                    <input
                        className="entradaFiltro"
                        placeholder="Buscar destino..."
                        value={estado.busqueda}
                        onChange={(e) => dispatch({ type: 'filtro', payload: { campo: 'busqueda', valor: e.target.value } })}
                    />
                    <select
                        className="selectorFiltro"
                        value={estado.filtroCategoria}
                        onChange={(e) => dispatch({ type: 'filtro', payload: { campo: 'filtroCategoria', valor: e.target.value } })}
                    >
                        <option value="todas">Todas las categorías</option>
                        {CATEGORIAS.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.emoji} {cat.nombre}</option>
                        ))}
                    </select>
                    <select
                        className="selectorFiltro"
                        value={estado.filtroEstado}
                        onChange={(e) => dispatch({ type: 'filtro', payload: { campo: 'filtroEstado', valor: e.target.value } })}
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="Planeado">Planeado</option>
                        <option value="Visitado">Visitado</option>
                    </select>
                    <button
                        className="botonLimpiar"
                        onClick={() => dispatch({ type: 'quitarFiltro' })}
                    >
                        Limpiar filtros
                    </button>
                </div>

                <p className="contadorResultados">{itemsVisibles.length} destino(s) encontrado(s)</p>

                <ListaItems items={itemsVisibles} archivarItem={archivarItem} />
            </div>

        </div>
    );
}

export default App;
