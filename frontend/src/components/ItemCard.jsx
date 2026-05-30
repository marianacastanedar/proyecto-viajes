

function VerItem({ item, archivarItem }) {
    return (
        <div className={`tarjeta cat-${item.categoriaId}`}>
            <div className="cuerpoTarjeta">
                <p className="nombreDestino">Nombre: {item.nombre}</p>
                <p className="dato">Pais: {item.atributos.pais}</p>
                <p className="dato">Ciudad: {item.atributos.ciudad}</p>
                <p className="dato">Continente: {item.atributos.continente}</p>
                <p className="dato">Categoría: {item.categoriaId}</p>
                <p className="dato">Estado: {item.estado}</p>
                <p className="dato">Puntuación: {item.puntuacion}</p>
                <p className="dato">Notas: {item.notas}</p>
            </div>
            <button className="botonArchivar" onClick={
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
