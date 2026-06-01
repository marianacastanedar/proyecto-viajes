import { useEffect } from 'react';

/**
 * Escucha un atajo de teclado y llama una función al presionarlo
 * @param {string} tecla - tecla a escuchar (ej: 'n', 'k')
 * @param {Function} alPresionar - función que se ejecuta al presionar
 * @param {{ ctrl: boolean }} opciones - si ctrl es true, requiere Ctrl+tecla
 */
export function useAtajoTeclado(tecla, alPresionar, { ctrl = false } = {}) {
    useEffect(() => {
        const handler = (e) => {
            const enInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
            if (enInput && !ctrl) return;
            if (ctrl && !e.ctrlKey) return;
            if (e.key.toLowerCase() !== tecla.toLowerCase()) return;
            e.preventDefault();
            alPresionar(e);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [tecla, alPresionar, ctrl]);
}
