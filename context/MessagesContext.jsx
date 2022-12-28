import React,{ createContext, useContext, useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'

export const MessagesContext = createContext()

const MessagesContextProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: '',
        user: {},
    }
    const chatReducer = (state,action) => {
        switch(action.type) {
            case 'USER_CHANGE':
                return {
                    chatId:currentUser.uid > action.payload.uid? currentUser?.uid + action.payload.uid : action.payload.uid + currentUser?.uid,
                    user: action.payload,
                }
            default: return state
        }
    }
    const[state,dispatch] = useReducer(chatReducer,INITIAL_STATE)
    return (
        <MessagesContext.Provider value={{state,dispatch}}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContextProvider