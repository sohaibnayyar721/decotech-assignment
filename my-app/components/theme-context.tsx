'use client'

import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context
}

const ThemeProvider = ({ children }: any) => {
    let [values, setValue] = useState('#FFFFFF')
   
    let handleValues = () => {
        if (values === '#FFFFFF') {
            setValue('#000000')
        } else {
            setValue('#FFFFFF')
        }
    }
    return (
        <ThemeContext.Provider value={{ values, handleValues }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider