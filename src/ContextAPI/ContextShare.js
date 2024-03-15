import React, { useState } from 'react'
import { createContext } from 'react'

export const addProjectResponseContext=createContext()
export const editUserProjectResponseContext=createContext()

function ContextShare({children}) {

    const [addProjectRes,setAddProjectRes]=useState("")
    const [editUserProjectRes,seteditUserProjectRes]=useState("")


  return (
    <div>
      <addProjectResponseContext.Provider value={{addProjectRes,setAddProjectRes}}>
        <editUserProjectResponseContext.Provider value={{editUserProjectRes,seteditUserProjectRes}}>
            {children}
        </editUserProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </div>
  )
}

export default ContextShare