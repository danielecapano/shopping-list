import { motion, AnimatePresence } from "framer-motion";

/* eslint-disable react/prop-types */


function CartModal({isOpen, setIsOpen, setItems}) {
    const emptyCart = () => {
        setItems([]);
        setIsOpen(false);
    }
  return (
    <>
        {isOpen && (
            <div className="cart-modal">
    
                <AnimatePresence>
                    <motion.div className="modal-content"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 20 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <h3 className="title">Sei sicuro di voler svuotare tutto il carrello?</h3>
                                        
                        <div className="buttons">
                            <button className="btn-null" onClick={() => setIsOpen(false)}>Annulla</button>
                            <button className="btn-reset" onClick={emptyCart}>Conferma</button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        )}
    </>
    
  )
}

export default CartModal