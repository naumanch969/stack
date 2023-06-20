import { createContext, useContext, useState } from "react"


const AppContext = createContext();

export const ContextProvider = ({ children }) => {

    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem(`isDarkMode`)) || false)

    return (
        <AppContext.Provider
            value={{
                isDarkMode, setIsDarkMode
            }}
        >
            {children}
        </AppContext.Provider>
    )
}


export const useStateContext = () => useContext(AppContext)