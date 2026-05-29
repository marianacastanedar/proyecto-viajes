import { useState, useCallback } from 'react';
import { StorageContext } from './StorageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function StorageProvider({ children }) {
    const [modo, setModoState] = useState(
        () => localStorage.getItem('modo') || 'local'
    );
    const [cargando, setCargando] = useState(false);
    const [errorConexion, setError] = useState(null);

    const setModo = (nuevoModo) => {
        setModoState(nuevoModo);
        localStorage.setItem('modo', nuevoModo);
    };

    const obtenerItems = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            if (modo === 'api') {
                const res = await fetch(`${API_URL}/api/items`);
                if (!res.ok) throw new Error(`error en servidor: ${res.status}`);
                return await res.json();
            } else {
                const data = localStorage.getItem('items');
                return data ? JSON.parse(data) : [];
            }
        } catch (err) {
            setError(err.message);
            return [];
        } finally {
            setCargando(false);
        }
    }, [modo]);

    return (
        <StorageContext.Provider value={{ modo, setModo, cargando, error, obtenerItems }}>
            {children}
        </StorageContext.Provider>
    );
}
