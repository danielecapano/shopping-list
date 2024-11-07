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
  const { todos: items, dispatch } = useTodo();

  const removeToList = (id) => {
    dispatch({ type: "removeTodo", payload: id });
  };

  // const toggleCompleted = (index) => {
  //     const updatedItems = [...items];
  //     const item = updatedItems[index];
  //     item.completed = !item.completed;
  //     if (item.completed) {
  //         // Se l'elemento viene contrassegnato come completato, lo sposto in cima alla lista
  //         updatedItems.splice(index, 1);
  //         updatedItems.push(item);
  //     } else {
  //         // Se l'elemento viene contrassegnato come non completato, lo sposto in fondo alla lista
  //         updatedItems.splice(index, 1);
  //         updatedItems.unshift(item);
  //     }
  //     setItems(updatedItems);
  // }

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
      {/* <li className="article"
        
        >
            <button className="btn-checked" ><FontAwesomeIcon icon={faCheck}/></button>
            <div className="article__description">
                <div className="article__details">
                    <span className="article__name">Passata di pomodoro</span>
                    <span className="article__quantity">10 X &euro; 0.99</span>
                </div>                          
                <span className="article__price">&euro; 9.90</span>
            </div>
            <div className="buttons">
                <button className="btn-remove">
                    <FontAwesomeIcon icon={faTrash}/></button>
                <button className="btn-mod">
                    <FontAwesomeIcon icon={faPenToSquare}/>
                </button>
            </div>
        </li> */}
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.li
            key={index}
            className={item.completed ? "article completed" : "article"}
            variants={li}
            exit={{ opacity: 0, x: -400, transition: { duration: 0.3 } }}
          >
            <button
              className={
                item.completed ? "btn-checked completed" : "btn-checked"
              }
              onClick={() => toggleCompleted(index)}
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
              {!item.completed && (
                <button className='btn-mod' onClick={() => modifyItem(index)}>
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
