import { useState, useEffect, useContext, useRef } from "react";
import { useAtajoTeclado } from "./hooks/useAtajoTeclado";
import { StorageContext } from "./context/StorageContext";
import { useTheme } from "./context/ThemeProvider";
import Formulario from "./components/FormularioItem";
import ListaItems from "./components/ListaItems";

function App() {
    const [items, setItems] = useState([]);
    const { obtenerItems, guardarItem, eliminarItem, modo, setModo, cargando, error } = useContext(StorageContext);
    const { tema, toggleTema } = useTheme();
    const intervaloRef = useRef(null);

    useEffect(() => {
        obtenerItems().then(lista => setItems(lista));
    }, [obtenerItems]);

    // vuelve a cargar cada 30s en la api 
    useEffect(() => {
        if (modo === 'api') {
            intervaloRef.current = setInterval(() => {
                obtenerItems().then(lista => setItems(lista));
            }, 30000);
        }
        return () => clearInterval(intervaloRef.current);
    }, [modo, obtenerItems]);

    // atajo T para cambiar tema
    useAtajoTeclado('t', toggleTema);

    const agregarItem = async (nuevo) => {
        await guardarItem(nuevo);
        const listaActualizada = await obtenerItems();
        setItems(listaActualizada);
    };

    const archivarItem = async (itemID) => {
        await eliminarItem(itemID);
        const listaActualizada = await obtenerItems();
        setItems(listaActualizada);
    };

    return (
        <div>
            <div>
                <span>Modo actual: {modo}</span>
                <button onClick={() => setModo(modo === 'api' ? 'local' : 'api')}>
                    Cambiar a {modo === 'api' ? 'local' : 'api'}
                </button>
                <button onClick={toggleTema}>
                    {tema === 'claro' ? '🌙 Oscuro' : '☀️ Claro'}
                </button>
            </div>
            {error && <p>Error: {error}</p>}
            {cargando && <p>Cargando...</p>}
            <Formulario agregarItem={agregarItem} />
            <ListaItems items={items} archivarItem={archivarItem} />
        </div>
    );
}

export default App;
