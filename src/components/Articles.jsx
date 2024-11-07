/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { useTodo } from "../context/todoContext";

function Articles() {
  const { todos: items, dispatch, setSelectedItem } = useTodo();

  const removeToList = (id) => {
    dispatch({ type: "removeTodo", payload: id });
  };

  const ul = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const li = {
    hidden: {
      opacity: 0,
      x: 400,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
  return (
    <motion.ul
      className='articles'
      variants={ul}
      initial='hidden'
      animate='visible'
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.li
            key={index}
            className={item.isCompleted ? "article completed" : "article"}
            variants={li}
            exit={{ opacity: 0, x: -400, transition: { duration: 0.3 } }}
          >
            <button
              className={
                item.isCompleted ? "btn-checked completed" : "btn-checked"
              }
              onClick={() => dispatch({ type: "toggleTodo", payload: item.id })}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <div className='article__description'>
              <div className='article__details'>
                <span className='article__name'>{item.text}</span>
                <span className='article__quantity'>
                  {item.quantity} X &euro; {item.price}
                </span>
              </div>

              <span className='article__price'>
                &euro; {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>

            <div className='buttons'>
              <button
                className='btn-remove'
                onClick={() => removeToList(item.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              {!item.isCompleted && (
                <button
                  className='btn-mod'
                  onClick={() => setSelectedItem(item)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              )}
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default Articles;
