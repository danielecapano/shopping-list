/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";



function Modal({items, setItems, modalName, setModalName, modalPrice, setModalPrice, modalQuantity, setModalQuantity, editingItem, setEditingItem}) {

    

    const saveModifiedItem = () => {
        const updatedItems = [...items];
        updatedItems[editingItem] = {
            ...updatedItems[editingItem],
            name: modalName,
            price: parseFloat(modalPrice),
            quantity: modalQuantity
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
    <>
        {editingItem !== null && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3 className="title">Modifica articolo</h3>
                            <input type="text"
                            className="input-name"
                            value={modalName}
                            onChange={(e) => setModalName(e.target.value)}
                            placeholder="Cosa vuoi comprare?"/>
    
                            <div className="second-line">
                                <input type="number"
                                className="input-price"
                                value={modalPrice}
                                onChange={(e) => setModalPrice(e.target.value)}
                                placeholder="Prezzo"/>
        
                                <div className="quantity">
                                    <button className="btn-minus" onClick={removeModalQuantity}>
                                        <FontAwesomeIcon icon={faMinus}/>
                                    </button>
                                    <input type="number"
                                    className="input-quantity"
                                    onChange={(e) => setModalQuantity(e.target.value)}
                                    value={modalQuantity} />
                                    <button className="btn-plus" onClick=       {addModalQuantity}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </button>
                                </div>
                            </div>
                        
                            {/* Pulsante per salvare le modifiche */}
                            <div className="buttons">
                                <button className="btn-reset" onClick={resetModifiedItem}>Annulla</button>
                                <button className="btn-modify" onClick={saveModifiedItem}>Salva</button>
                            </div>
                        </div>
                    </div>
                )}
    </>
  )
}

export default Modal