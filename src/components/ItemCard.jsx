

function VerItem({ item, archivarItem }) {
    return (
        <div style={{ backgroundColor: "#f1e4ff" }}>
            <div>
                <p>Pais: {item.pais}</p>
                <p>Ciudad: {item.ciudad}</p>
                <p>Categoría: {item.categoriaID}</p>
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
