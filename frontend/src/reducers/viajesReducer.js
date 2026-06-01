export const estadoInicial = {
    lista: [],
    filtroCategoria: 'todas',
    filtroEstado: 'todos',
    busqueda: '',
};

export function viajesReducer(estado, accion) {
    switch (accion.type) {
        case 'hidratar':
            return { ...estado, lista: accion.payload };

        case 'agregar':
            return { ...estado, lista: [...estado.lista, accion.payload] };

        case 'eliminar':
            return {
                ...estado,
                lista: estado.lista.map(i =>
                    i.id === accion.payload ? { ...i, activo: false } : i
                ),
            };

        case 'cambiarEstado':
            return {
                ...estado,
                lista: estado.lista.map(i =>
                    i.id === accion.payload.id
                        ? { ...i, estado: accion.payload.estado }
                        : i
                ),
            };

        case 'filtro':
            return { ...estado, [accion.payload.campo]: accion.payload.valor };

        case 'quitarFiltro':
            return {
                ...estado,
                filtroCategoria: 'todas',
                filtroEstado: 'todos',
                busqueda: '',
            };

        case 'registrarActividad':
            return {
                ...estado,
                lista: estado.lista.map(i =>
                    i.id === accion.payload.itemId
                        ? { ...i, fechaActividad: accion.payload.fecha }
                        : i
                ),
            };

        default:
            throw new Error(`Acción desconocida: ${accion.type}`);
    }
}