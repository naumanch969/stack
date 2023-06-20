import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import { FiSettings } from "react-icons/fi"
import { TooltipComponent } from "@syncfusion/ej2-react-popups"
import "./App.css"
import { Footer, Navbar, Sidebar, ThemeSettings } from "./components"
import { Ecommerce, Orders, Customers, Calendar, Employees, Stacked, Pyramid, Kanban, Area, Bar, Line, Pie, Financial, ColorMapping, ColorPicker, Editor } from "./pages"
import { useStateContext } from "./contexts/ContextProvider"

const App = () => {

  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext()

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''} >

      <BrowserRouter>

        <div className="flex relative dark:bg-main-dark-bg" >
          {/* settings toggle button */}
          <div className="fixed bottom-4 right-4" style={{ zIndex: "1000" }} >
            <TooltipComponent content="Settings" position="Top" >
              <button
                type="button"
                onClick={(() => setThemeSettings(true))}
                className="text-3xl p-3 bg-blue hover:drop-shadow-xl hover:bg-light-gray text-white "
                style={{ background: currentColor, borderRadius: '50%' }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>


          {/* sidebar */}
          {
            activeMenu
              ?
              (<div className="w-64 sticky sidebar dark-bg-secondary-dark-bg bg-white" >
                <Sidebar />
              </div>)
              :
              (<div className="w-0 dark:bg-secondary-dark-bg" >
                <Sidebar />
              </div>)
          }


          <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml:72' : 'flex-2'}`} >

            {/* navbar */}
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full" >
              <Navbar />
            </div>

            {/* routes */}
            <div>

              {
                themeSettings && <ThemeSettings />
              }

              <Routes>
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* pages */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-maping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

              </Routes>
            </div>

          </div>
        </div>

      </BrowserRouter>
    </div>
  )
}

export default App;
