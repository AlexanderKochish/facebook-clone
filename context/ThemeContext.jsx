import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext(false)

const ThemeContextProvider = ({children}) => {
    const[theme,setTheme] = useState(false)
    useEffect(()=>{
        if(!theme){
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme','dark')
        }else{
            document.documentElement.classList.remove('dark')
            localStorage.removeItem('theme')
        } 
    },[theme])
    const handleTheme = () => setTheme(!theme)
    return (
        <ThemeContext.Provider value={{handleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


export default ThemeContextProvider