/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";

const todoContext = createContext();

const initialState = [];

const todoReducer = (state, action) => {
  switch (action.type) {
    case "addTodo":
      return [...state, action.payload];

    case "removeTodo":
      return state.filter((todo) => todo.id !== action.payload);

    case "editTodo":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              text: action.payload.text,
              price: action.payload.price,
              quantity: action.payload.quantity,
            }
          : todo
      );

    case "toggleTodo":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );

    default:
      throw new Error(`Azione non gestita: ${action.type}`);
  }
};

export default function TodoContextProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  return (
    <todoContext.Provider value={{ todos, dispatch }}>
      {children}
    </todoContext.Provider>
  );
}

export const useTodo = () => useContext(todoContext);
