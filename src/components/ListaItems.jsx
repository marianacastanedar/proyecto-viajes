function VerItem({ items }) {
    return (
        <div>
            {items.map(item =>
                <p key={item}>{item}</p>
            )}
        </div>
        
    )
}
export default VerItem;
