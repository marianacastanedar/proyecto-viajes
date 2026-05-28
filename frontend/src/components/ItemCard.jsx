

function VerItem({ item, archivarItem }) {
    return (
        <div>
            <div>
                <p>Nombre: {item.nombre}</p>
                <p>Pais: {item.atributos.pais}</p>
                <p>Ciudad: {item.atributos.ciudad}</p>
                <p>Continente: {item.atributos.continente}</p>
                <p>Categoría: {item.categoriaId}</p>
                <p>Estado: {item.estado}</p>
                <p>Puntuación: {item.puntuacion}</p>
                <p>Notas: {item.notas}</p>
            </div>
            <button onClick={
                () => {
                    archivarItem(item.id)
                }
            }>
                Archivar item
            </button>
        </div>

    )
}
export default VerItem;
