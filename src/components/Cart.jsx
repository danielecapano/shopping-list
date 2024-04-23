/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Cart({items, isPriced, setIsOpen}) {
    const totalPrice = items.reduce((acc, el) => {
        return acc + isPriced(el.price) * el.quantity;
    }, 0);

    const totalQuantity = items.reduce((acc, el) => {
        return acc + parseInt(el.quantity);
    }, 0);
    
  return (
    <div className="cart">
                {items.length > 0 && 
                    <>
                        <div className="icon">
                            <FontAwesomeIcon icon={faCartShopping}/>
                            <span className="total-quantity">
                                {totalQuantity}
                            </span>
                        </div>
                        <div className="total">
                            Totale: <span>&euro; {totalPrice.toFixed(2)}</span>
                        </div>
                        <button className="btn-open" onClick={() => setIsOpen(true)}>Svuota</button>
                    </>
                    
                }
                {items.length === 0 && (
                    <>
                        <FontAwesomeIcon icon={faCartShopping} className="icon" />
                        <div className="total">Il tuo carrello è vuoto</div>
                    </>
                )}
            </div>
  )
}

export default Cart