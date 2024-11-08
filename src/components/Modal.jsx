/* eslint-disable react/prop-types */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTodo } from "../context/todoContext";

function Modal() {
  const { selectedItem, setSelectedItem, dispatch } = useTodo();

  const { text, price, quantity } = selectedItem;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === "price" || name === "quantity") {
    //   setSelectedItem((prevTodo) => ({
    //     ...prevTodo,
    //     [name]: isNaN(value) ? 0 : parseFloat(value),
    //   }));
    //   console.log(isNaN(price));
    // } else {
    setSelectedItem((prevTodo) => ({
      ...prevTodo,

      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "editTodo", payload: selectedItem });
    setSelectedItem(null);

    console.log(selectedItem);
  };

  const addQuantity = () => {
    setSelectedItem((prevTodo) => ({
      ...prevTodo,
      quantity: quantity + 1,
    }));
  };
  const removeQuantity = () => {
    if (quantity > 1) {
      setSelectedItem((prevTodo) => ({
        ...prevTodo,
        quantity: quantity - 1,
      }));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className='modal'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className='modal-content'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <h3 className='title'>Modifica articolo</h3>
          <input
            type='text'
            className='input-name'
            name='text'
            value={text}
            onChange={handleChange}
            placeholder='Cosa vuoi comprare?'
          />

          <div className='second-line'>
            <input
              type='text'
              inputMode='numeric'
              className='input-price'
              name='price'
              value={price}
              onChange={handleChange}
              placeholder='Prezzo'
            />

            <div className='quantity'>
              <button className='btn-minus' onClick={removeQuantity}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input
                type='number'
                className='input-quantity'
                onChange={handleChange}
                value={quantity}
                name='quantity'
                readOnly
              />
              <button className='btn-plus' onClick={addQuantity}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className='buttons'>
            <button className='btn-reset' onClick={() => setSelectedItem(null)}>
              Annulla
            </button>
            <button className='btn-modify' onClick={handleSubmit}>
              Salva
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Modal;
