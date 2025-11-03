import React, { useState } from 'react'
import AuthenticationContext from './createContext'

function AuthenticationProvider({children}) {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
  return (
    <AuthenticationContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider