
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus,} from "@fortawesome/free-solid-svg-icons";


import { useState, useEffect } from "react";
import CartModal from "./CartModal";
import Cart from "./Cart";
import Modal from "./Modal";
import Articles from "./Articles";





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
    const [isOpen, setIsOpen] = useState(false);
    

   
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

    

    const nameChange = (e) => {setName(e.target.value)}

    const priceChange = (e) => {setPrice(e.target.value);}

    const quantityChange = (e) => {setQuantity(e.target.value);}

    

    const modifyItem = (index) => {
        const item = items[index];
        setEditingItem(index);
        // Popola gli stati della modale con i valori dell'elemento corrente
        setModalName(item.name);
        setModalPrice(item.price);
        setModalQuantity(item.quantity);
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
    
    const isPriced = (price) => {
        if(isNaN(price)) {
            return parseFloat(0).toFixed(2);
        } else {
            return parseFloat(price).toFixed(2);
        }
    }
    
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
            
            <Articles items={items} setItems={setItems} modifyItem={modifyItem} isPriced={isPriced} />
           
            <CartModal classes={isOpen ? 'cart-modal open' : 'cart-modal'} setIsOpen={setIsOpen} setItems={setItems} />

            <Modal items={items} setItems={setItems} modalName={modalName} setModalName={setModalName} modalPrice={modalPrice} setModalPrice={setModalPrice} modalQuantity={modalQuantity} setModalQuantity={setModalQuantity} editingItem={editingItem} setEditingItem={setEditingItem} />
    
            <Cart items={items} isPriced={isPriced} setIsOpen={setIsOpen} />
        </div>

        
        
    </main>
  )
}

export default ShoppingList