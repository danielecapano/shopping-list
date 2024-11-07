import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import CartModal from "./CartModal";
import Cart from "./Cart";
import Modal from "./Modal";
import Articles from "./Articles";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";
import { useTodo } from "../context/todoContext";

// const isValidInput = (input) => {
//   const regex = /^\d*\.?\d*$/;
//   return regex.test(input);
// };

function ShoppingList() {
  const { todos, dispatch } = useTodo();
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("shoppingList");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  // const [name, setName] = useState("");
  // const [price, setPrice] = useState('');
  // const [quantity, setQuantity] = useState(1);
  const [editingItem, setEditingItem] = useState(null);
  const [modalName, setModalName] = useState("");
  const [modalPrice, setModalPrice] = useState("");
  const [modalQuantity, setModalQuantity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [newTodo, setNewTodo] = useState({
    text: "",
    price: "",
    quantity: 1,
    isCompleted: false,
  });

  const { text, price, quantity, isCompleted } = newTodo;
  console.log(text, price);

  const addQuantity = () => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      quantity: quantity + 1,
    }));
  };
  const removeQuantity = () => {
    if (quantity > 1) {
      setNewTodo((prevTodo) => ({
        ...prevTodo,
        quantity: quantity - 1,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Gestione speciale per i campi price e quantity
    if (name === "price" || name === "quantity") {
      // Se l'input è numerico, convertilo, altrimenti mantieni il valore vuoto o 0
      //   const numericValue = value === "" ? "" : parseFloat(value);

      // Aggiorna solo price e quantity, gli altri campi vengono gestiti normalmente
      setNewTodo((prevTodo) => ({
        ...prevTodo,
        [name]: value === "" ? 0 : parseFloat(value),
        // Gestisce NaN e assicura che il valore sia un numero
      }));
      console.log(isNaN(price));
    } else {
      // Per gli altri campi, non modificare il valore
      setNewTodo((prevTodo) => ({
        ...prevTodo,
        id: uuid(),
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "addTodo", payload: newTodo });

    console.log(newTodo);
  };

  // useEffect(() => {
  //     localStorage.setItem("shoppingList", JSON.stringify(items));
  // }, [items]);

  // const addToList = () => {
  //     if(name !== ''){

  //         const newItem = {
  //             name: name,
  //             price: parseFloat(price),
  //             quantity: parseInt(quantity),
  //             completed: false
  //         }
  //         setItems((items) => [...items, newItem]);
  //         console.log(items);
  //         setName('');
  //         setPrice('')
  //         setQuantity(1)
  //     }

  // }

  // const nameChange = (e) => {setName(e.target.value)}

  // const priceChange = (e) => {setPrice(e.target.value);}

  // const quantityChange = (e) => {setQuantity(e.target.value);}

  // const modifyItem = (index) => {
  //     const item = items[index];
  //     setEditingItem(index);
  //     // Popola gli stati della modale con i valori dell'elemento corrente
  //     setModalName(item.name);
  //     setModalPrice(item.price);
  //     setModalQuantity(item.quantity);
  // }

  // const addQuantity = () => setQuantity((prev) => prev + 1);

  // const removeQuantity = () => {
  //     setQuantity((prev) => {
  //         if (prev > 1) {
  //             return prev - 1;
  //         } else {
  //             return 1;
  //         }
  //     })
  // };

  // const isPriced = (price) => {
  //     if(isNaN(price)) {
  //         return parseFloat(0).toFixed(2);
  //     } else {
  //         return parseFloat(price).toFixed(2);
  //     }
  // }

  return (
    <main>
      <div className='container'>
        <motion.h2
          className='title'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Lista della spesa
        </motion.h2>

        <div className='insert-data'>
          <motion.input
            type='text'
            initial={{ opacity: 0, x: -400 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className='input-name'
            name='text'
            value={text}
            onChange={handleChange}
            placeholder='Cosa vuoi comprare?'
          />

          <div className='second-line'>
            <motion.input
              type='number'
              step={0.01}
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='input-price'
              name='price'
              value={price || ""}
              onChange={handleChange}
              pattern='^\d*\.?\d*$'
              placeholder='Prezzo'
            />

            <motion.div
              className='quantity'
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <button className='btn-minus' onClick={removeQuantity}>
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <input
                type='number'
                className='input-quantity'
                name='quantity'
                value={quantity}
                onChange={handleChange}
              />

              <button className='btn-plus' onClick={addQuantity}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </motion.div>

            <motion.button
              className='btn-add'
              onClick={handleSubmit}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              Aggiungi
            </motion.button>
          </div>
        </div>

        <Articles />

        <CartModal
          classes={isOpen ? "cart-modal open" : "cart-modal"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setItems={setItems}
        />

        <Modal
          items={items}
          setItems={setItems}
          modalName={modalName}
          setModalName={setModalName}
          modalPrice={modalPrice}
          setModalPrice={setModalPrice}
          modalQuantity={modalQuantity}
          setModalQuantity={setModalQuantity}
          editingItem={editingItem}
          setEditingItem={setEditingItem}
        />

        {/* <Cart items={items} isPriced={isPriced} setIsOpen={setIsOpen} /> */}
      </div>
    </main>
  );
}

export default ShoppingList;
