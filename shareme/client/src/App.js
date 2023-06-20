import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Navbar, Login } from "./components"
import { Home } from "./container"
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => {
  return (

    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID} >
      <BrowserRouter>

        <Navbar />
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<Home />} />
        </Routes>

      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}

export default App