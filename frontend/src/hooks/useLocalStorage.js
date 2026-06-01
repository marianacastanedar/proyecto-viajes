import { useState, useEffect } from 'react';

/**
 * Guarda y lee un valor de localStorage
 * @param {string} clave - nombre de la clave en localStorage
 * @param {*} inicial - valor si no hay nada guardado
 * @returns {[*, Function]} el valor y una función para cambiarlo
 */

export function useLocalStorage(clave, inicial) {
    const [valor, setValor] = useState(() => {
        try {
            const guardado = localStorage.getItem(clave);
            return guardado !== null ? JSON.parse(guardado) : inicial;
        } catch {
            return inicial;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (e) {
            console.warn('useLocalStorage error:', e);
        }
    }, [clave, valor]);

    return [valor, setValor];
}
