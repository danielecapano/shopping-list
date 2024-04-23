/* eslint-disable react/prop-types */


function CartModal({classes, setIsOpen, setItems}) {
    const emptyCart = () => {
        setItems([]);
        setIsOpen(false);
    }
  return (
    <div className={classes}>
        <div className="modal-content">
                            <h3 className="title">Sei sicuro di voler svuotare tutto il carrello?</h3>
                           
                        
                            {/* Pulsante per salvare le modifiche */}
                            <div className="buttons">
                                <button className="btn-null" onClick={() => setIsOpen(false)}>Annulla</button>
                                <button className="btn-reset" onClick={emptyCart}>Conferma</button>
                            </div>
                        </div>
    </div>
  )
}

export default CartModal