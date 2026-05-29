import { useState, useEffect, useContext } from "react";
import { StorageContext } from "./context/StorageContext";
import { useTheme } from "./context/ThemeProvider";
import Formulario from "./components/FormularioItem";
import ListaItems from "./components/ListaItems";

function App() {
    const [items, setItems] = useState([]);
    const { obtenerItems, guardarItem, eliminarItem, modo, setModo, cargando, error } = useContext(StorageContext);
    const { tema, toggleTema } = useTheme();

    useEffect(() => {
        obtenerItems().then(lista => setItems(lista));
    }, [obtenerItems]);

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
