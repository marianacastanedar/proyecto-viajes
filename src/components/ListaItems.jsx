function VerItem({ items }) {
  return (
    <div>
      {items.map(item =>
        <div key={item.id}>
          <p>{item.nombre}</p>
          <p>{item.categoriaID}</p>
          <p>{item.estado}</p>
          <p>{item.puntuacion}</p>
          <p>{item.notas}</p>
        </div>
      )}
    </div>

  )
}
export default VerItem;
