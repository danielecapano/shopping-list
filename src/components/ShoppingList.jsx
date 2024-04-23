
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCheck, faTrash, faPenToSquare, faCartShopping } from "@fortawesome/free-solid-svg-icons";


import { useState, useEffect } from "react";




function ShoppingList() {
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem("shoppingList");
        return storedItems ? JSON.parse(storedItems) : [];
    });
    const [name, setName] = useState("");
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [editingItem, setEditingItem] = useState(null);
    const [modalName, setModalName] = useState("");
    const [modalPrice, setModalPrice] = useState('');
    const [modalQuantity, setModalQuantity] = useState(1);

   
    useEffect(() => {
        localStorage.setItem("shoppingList", JSON.stringify(items));
    }, [items]);

    const addToList = () => {
        if(name !== ''){

            const newItem = {
                name: name,
                price: parseFloat(price),
                quantity: quantity,
                completed: false
            }
            setItems((items) => [...items, newItem]);
            console.log(items);
            setName('');
            setPrice('')
            setQuantity(1)
        }

    }

    const removeToList = (index) => {
        setItems(items => items.filter((_, i) => i !== index))}

    const nameChange = (e) => {setName(e.target.value)}

    const priceChange = (e) => {setPrice(e.target.value);}

    const quantityChange = (e) => {setQuantity(e.target.value);}

    const toggleCompleted = (index) => {
        const updatedItems = [...items];
        const item = updatedItems[index];
        item.completed = !item.completed;
        if (item.completed) {
            // Se l'elemento viene contrassegnato come completato, lo sposto in cima alla lista
            updatedItems.splice(index, 1);
            updatedItems.push(item);
        } else {
            // Se l'elemento viene contrassegnato come non completato, lo sposto in fondo alla lista
            updatedItems.splice(index, 1);
            updatedItems.unshift(item);
        }
        setItems(updatedItems);
    }



    const modifyItem = (index) => {
        const item = items[index];
        setEditingItem(index);
        // Popola gli stati della modale con i valori dell'elemento corrente
        setModalName(item.name);
        setModalPrice(item.price);
        setModalQuantity(item.quantity);
    }

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

    const addQuantity = () => setQuantity((prev) => prev + 1);

    const removeQuantity = () => {
        setQuantity((prev) => {
            if (prev > 1) {
                return prev - 1;
            } else {
                return 1;
            }
        })
    };
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

    const isPriced = (price) => {
        if(isNaN(price)) {
            return parseFloat(0).toFixed(2);
        } else {
            return parseFloat(price).toFixed(2);
        }
    }
    const totalPrice = items.reduce((acc, el) => {
        return acc + isPriced(el.price) * el.quantity;
    }, 0);

    const totalQuantity = items.reduce((acc, el) => {
        return acc + parseInt(el.quantity);
    }, 0);


  return (
    <main>
        <div className="container">
            <h2 className="title">Lista della spesa</h2>

            <div className="insert-data">
                <input type="text"
                className="input-name"
                value={name}
                onChange={nameChange}
                placeholder="Cosa vuoi comprare?"/>
        
                <div className="second-line">
                    <input type="number"
                    className="input-price"
                    value={price}
                    onChange={priceChange}
                    placeholder="Prezzo"/>
            
                    <div className="quantity">
                        <button className="btn-minus" onClick={removeQuantity}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </button>
                        
                        <input type="number"
                         className="input-quantity"
                         onChange={quantityChange}
                         value={quantity} />
                     
                        <button className="btn-plus" onClick={addQuantity}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
            
                    <button className="btn-add" onClick={addToList}>Aggiungi</button>
                </div>
            </div>
            
    
            <ul className="articles">
                {items.map((item, index) => 
                    <li key={index} className={item.completed ? "article completed" : "article"}>
                        <button className={item.completed ? "btn-checked completed" : "btn-checked"} onClick={() => toggleCompleted(index)}><FontAwesomeIcon icon={faCheck}/></button>
                        <div className="article__description">
                            <div className="article__details">
                                <span className="article__name">{item.name}</span>
                                <span className="article__quantity">{item.quantity} X &euro; {isPriced(item.price)}</span>
                            </div>
                            
                                
                                <span className="article__price">&euro; {(isPriced(item.price) * item.quantity).toFixed(2)}</span>
                           
                        </div>

                        <div className="buttons">
                            <button className="btn-remove" onClick={() => removeToList(index)}><FontAwesomeIcon icon={faTrash}/></button>
                            {!item.completed && <button className="btn-mod" onClick={() => modifyItem(index)}><FontAwesomeIcon icon={faPenToSquare}/></button>}
                        </div>
    
                    </li>
            )}
            </ul>
    
            {editingItem !== null && (
                    <div className="modal">
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
                )}
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
                    </>
                    
                }
                {items.length === 0 && (
                    <>
                        <FontAwesomeIcon icon={faCartShopping} className="icon" />
                        <div className="total">Il tuo carrello è vuoto</div>
                    </>
                )}
            </div>
        </div>

        
        
    </main>
  )
}

export default ShoppingList