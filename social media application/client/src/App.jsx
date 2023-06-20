import { Home, Profile, Login, Register } from './pages'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppWrapper } from './wrapper'
import { useStateContext } from './contexts/ContextProvider'
import { useEffect } from 'react'

const App = () => {

  const { isDarkMode } = useStateContext()

  const user = true

  useEffect(() => {
    console.log('isDarkMode', isDarkMode)
  }, [isDarkMode])


  return (
    <div className={`app bg-gray-900 bg-bg  ${isDarkMode && 'bg-bg'} `} >
      <BrowserRouter>
        <div className="min-h-screen w-screen overflow-x-hidden " >
          <Routes>
            <Route path='/' element={user ? <AppWrapper Children={Home} /> : <Navigate replace to='/login' />} />
            <Route path='/profile/:id' element={user ? <AppWrapper Children={Profile} /> : <Navigate replace to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App