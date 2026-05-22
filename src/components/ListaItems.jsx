import VerItem from "./ItemCard"

function ListaItems({ items }) {
  return (
    <div>
      <h1>Historial de paises registrados:</h1>
      {items.map(item => 
          (<VerItem key={item.id} item={item} />)
      )}
    </div>

  )
}
export default ListaItems;
