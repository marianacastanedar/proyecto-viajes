import VerItem from "./ItemCard"

function ListaItems({ items, archivarItem }) {
  return (
    <div className="lista">
      <h1 className="tituloLista">Historial de paises registrados:</h1>
      {items
        .filter(item => item.activo)
        .map(item => 
          (<VerItem key={item.id} item={item} archivarItem={archivarItem} />)
      )}
    </div>
  )
}
export default ListaItems;
/*
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
*/
