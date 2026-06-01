import { useMemo } from 'react';

/**
 * Calcula estadísticas del log de viajes
 * @param {Array} items - lista de destinos
 * @returns {{ total: number, visitados: number, planeados: number, promedio: number }}
 */
export function useEstadisticasViaje(items) {
    const stats = useMemo(() => {
        const activos = items.filter(i => i.activo);
        const visitados = activos.filter(i => i.estado === 'Visitado').length;
        const planeados = activos.filter(i => i.estado === 'Planeado').length;
        const conPuntos = activos.filter(i => i.puntuacion !== null && i.puntuacion > 0);
        const promedio = conPuntos.length > 0
            ? conPuntos.reduce((s, i) => s + i.puntuacion, 0) / conPuntos.length
            : 0;
        return { total: activos.length, visitados, planeados, promedio };
    }, [items]);

    return stats;
}
