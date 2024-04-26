/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";




function Modal({items, setItems, modalName, setModalName, modalPrice, setModalPrice, modalQuantity, setModalQuantity, editingItem, setEditingItem}) {

    

    const saveModifiedItem = () => {
        const updatedItems = [...items];
        updatedItems[editingItem] = {
            ...updatedItems[editingItem],
            name: modalName,
            price: parseFloat(modalPrice),
            quantity: parseInt(modalQuantity)
        };
        setItems(updatedItems);
        setEditingItem(null);
    }

    const resetModifiedItem = () => {
        setEditingItem(null);
        setModalName('');
        setModalPrice('');
        setModalQuantity(1);
    }

    const addModalQuantity = () => setModalQuantity((prev) => prev + 1);

    const removeModalQuantity = () => {
        setModalQuantity((prev) => {
            if (prev > 1) {
                return prev - 1;
            } else {
                return 1;
            }
        })
    };

  return (
    <AnimatePresence>
        {editingItem !== null && (
            <motion.div className="modal"
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            
            >
                
                <motion.div className="modal-content"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 20 }}
                exit={{ opacity: 0, scale: 0.5 }}
                >
                    <h3 className="title">Modifica articolo</h3>
                    <input type="text"
                    className="input-name"
                    value={modalName}
                    onChange={(e) => setModalName(e.target.value)}
                    placeholder="Cosa vuoi comprare?"/>

                    <div className="second-line">
                        <input type="text"
                        className="input-price"
                        value={modalPrice}
                        onChange={(e) => setModalPrice(e.target.value)}
                        placeholder="Prezzo"/>

                        <div className="quantity">
                            <button className="btn-minus" onClick={removeModalQuantity}>
                                <FontAwesomeIcon icon={faMinus}/>
                            </button>
                            <input type="text"
                            className="input-quantity"
                            onChange={(e) => setModalQuantity(e.target.value)}
                            value={modalQuantity} />
                            <button className="btn-plus" onClick={addModalQuantity}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>
                        </div>
                    </div>
                
                    {/* Pulsante per salvare le modifiche */}
                    <div className="buttons">
                        <button className="btn-reset" onClick={resetModifiedItem}>Annulla</button>
                        <button className="btn-modify" onClick={saveModifiedItem}>Salva</button>
                    </div>
                </motion.div>
                
            </motion.div>
        )}
    </AnimatePresence>
  )
}

export default Modal