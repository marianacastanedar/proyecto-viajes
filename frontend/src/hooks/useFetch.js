import { useState, useEffect } from 'react';

/**
 * Hace fetch a una URL y maneja los estados de carga
 * @param {string|null} url - url para consultar, null para no hacer nada
 * @returns {{ data: *, cargando: boolean, error: string|null }}
 */
export function useFetch(url) {
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) { setCargando(false); return; }
        const controller = new AbortController();
        (async () => {
            try {
                setCargando(true);
                setError(null);
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                setData(await res.json());
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setCargando(false);
            }
        })();
        return () => controller.abort();
    }, [url]);

    return { data, cargando, error };
}
