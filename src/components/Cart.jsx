/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useTodo } from "../context/todoContext";

function Cart() {
  const { todos: items, openModal } = useTodo();

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalQuantity = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  return (
    <motion.div
      className='cart'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      {items.length > 0 && (
        <>
          <div className='icon'>
            <FontAwesomeIcon icon={faCartShopping} />
            <span className='total-quantity'>{totalQuantity}</span>
          </div>
          <div className='total'>
            Totale: <span>&euro; {totalPrice.toFixed(2)}</span>
          </div>
          <button className='btn-open' onClick={openModal}>
            Svuota
          </button>
        </>
      )}
      {items.length === 0 && (
        <>
          <FontAwesomeIcon icon={faCartShopping} className='icon' />
          <div className='total'>Il tuo carrello è vuoto</div>
        </>
      )}
    </motion.div>
  );
}

export default Cart;
