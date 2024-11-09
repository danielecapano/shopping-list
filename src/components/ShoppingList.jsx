/* eslint-disable react-hooks/exhaustive-deps */
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

function ShoppingList() {
  const { todos, dispatch, selectedItem, isOpenModal } = useTodo();

  const [newTodo, setNewTodo] = useState({
    text: "",
    price: "",
    quantity: 1,
    isCompleted: false,
  });

  const { text, price, quantity } = newTodo;
  console.log(text, price, todos);

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

    // if (name === "price" || name === "quantity") {
    //   setNewTodo((prevTodo) => ({
    //     ...prevTodo,
    //     [name]: value === "" ? 0 : parseFloat(value),
    //   }));
    //   console.log(isNaN(price));
    // } else {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      id: uuid(),
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch({ type: "addTodo", payload: newTodo });

      console.log(newTodo);
      setNewTodo({
        text: "",
        price: "",
        quantity: 1,
        isCompleted: false,
      });
    }
  };
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingList"));
    if (storedItems) {
      dispatch({ type: "savedTodos", payload: storedItems });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(todos));
  }, [todos]);

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
            autoComplete='off'
          />

          <div className='second-line'>
            <motion.input
              type='text'
              inputMode='numeric'
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className='input-price'
              name='price'
              value={price}
              onChange={handleChange}
              pattern='^\d*\.?\d*$'
              placeholder='Prezzo'
              autoComplete='off'
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
                readOnly
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

        {isOpenModal && <CartModal />}

        {selectedItem && <Modal />}

        <Cart />
      </div>
    </main>
  );
}

export default ShoppingList;
