import { useState, useCallback } from 'react';
import { StorageContext } from './StorageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function StorageProvider({ children }) {
    const [modo, setModoState] = useState(
        () => localStorage.getItem('modo') || 'local'
    );
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

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

    const guardarItem = useCallback(async (item) => {
        if (modo === 'api') {
            const res = await fetch(`${API_URL}/api/items`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            });
            if (!res.ok) throw new Error('No se pudo guardar el destino');
            return await res.json();
        } else {
            const guardado = localStorage.getItem('items');
            const lista = guardado ? JSON.parse(guardado) : [];
            lista.push(item);
            localStorage.setItem('items', JSON.stringify(lista));
            return item;
        }
    }, [modo]);

    const eliminarItem = useCallback(async (id) => {
        if (modo === 'api') {
            const res = await fetch(`${API_URL}/api/items/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('No se pudo archivar el destino');
        } else {
            const guardado = localStorage.getItem('items');
            if (!guardado) return;
            const lista = JSON.parse(guardado);
            const actualizada = lista.map(i => i.id === id ? { ...i, activo: false } : i);
            localStorage.setItem('items', JSON.stringify(actualizada));
        }
    }, [modo]);

    return (
        <StorageContext.Provider value={{ modo, setModo, cargando, error, obtenerItems, guardarItem, eliminarItem }}>
            {children}
        </StorageContext.Provider>
    );
}
