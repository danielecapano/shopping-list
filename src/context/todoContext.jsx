/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext, useReducer } from "react";

const todoContext = createContext();

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "savedTodos":
      return action.payload;
    case "addTodo":
      return [
        ...state,
        {
          ...action.payload,
          price:
            action.payload.price === "" ? 0 : parseFloat(action.payload.price),
        },
      ];

    case "removeTodo":
      return state.filter((todo) => todo.id !== action.payload);

    case "editTodo":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              price:
                action.payload.price === ""
                  ? 0
                  : parseFloat(action.payload.price),
              quantity: action.payload.quantity,
            }
          : todo
      );

    case "toggleTodo":
      const updatedTodos = state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

      return [
        ...updatedTodos.filter((todo) => !todo.isCompleted), // I todo non completati
        ...updatedTodos.filter((todo) => todo.isCompleted), // I todo completati
      ];
    case "resetTodos":
      return initialState;

    default:
      throw new Error(`Azione non gestita: ${action.type}`);
  }
};

export default function TodoContextProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <todoContext.Provider
      value={{
        todos,
        dispatch,
        selectedItem,
        setSelectedItem,
        isOpenModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </todoContext.Provider>
  );
}

export const useTodo = () => useContext(todoContext);
