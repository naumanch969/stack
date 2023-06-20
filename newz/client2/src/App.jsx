import { Box } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Footer, Navbar } from "./components"
import { Home } from "./pages"

const App = () => {



  return (
    <BrowserRouter>

      <div className="relative min-h-screen " >
        <Navbar />
        <div className="py-[2rem] " >
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/news/:params" element={<News />} />
          <Route path="/news-detail/:params/:id" element={<NewsDetail />} />
          <Route path="/all-categories" element={<AllCategories />} /> */}
          </Routes>
          <Footer />
        </div>
      </div>

    </BrowserRouter>
  )
}

export default App
