/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function Articles({items, setItems, isPriced, modifyItem}) {

    const removeToList = (index) => {
        setItems(items => items.filter((_, i) => i !== index))}

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
  return (
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
  )
}

export default Articles