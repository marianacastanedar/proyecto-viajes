function VerItem({ item }) {
    return (
        <div style={{ backgroundColor: "#f1e4ff"}}>
            <p>Pais: {item.pais}</p>
            <p>Ciudad: {item.ciudad}</p>
            <p>Categoría: {item.categoriaID}</p>
            <p>Estado: {item.estado}</p>
            <p>Puntuación: {item.puntuacion}</p>
            <p>Notas: {item.notas}</p>
        </div>
    )
}
export default VerItem;
