import React, { createContext, useReducer } from "react";

const ChatContext = createContext();

const initialState = {
  currContact: {
    avatar: "",
    userName: "",
    id: "",
  },
  myList: [],
};

const chatReducer = (state, action) => {
  const { type, payload } = action;
  switch(type){
    case "SET_CURR_CONTACT":
      return {...state,currContact:{...payload}}
    case "SET_MY_LIST":
      return {...state,myList:[...payload]}
    case "RESET":
      return {...initialState}
    default:
      return state
  }
};

const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export {ChatContext}
export default ChatProvider;
