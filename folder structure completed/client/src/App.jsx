import { Routes, Route } from "react-router-dom"
import { Navbar, Sidebar, Rightbar } from "./components"
import { Alert } from "@mui/material"
import { useStateContext } from "./contexts/ContextProvider"

const Apps = () => {

  const activeMenu = true
  const parentFolderArr = ['Dashboard', 'Code', 'Apps', 'Others']  // list of titles of all first most folders

  const { folderState, setFolderState } = useStateContext()

  return (
    <div className=" max-w-screen min-h-screen overflow-x-clip bg-gray-shadow  " >

      <div className="sticky left-0 top-0 z-50 h-16 w-screen text-white backdrop-brightness-50  " >
        <Navbar />
      </div>

      {
        folderState.showAlert &&
        <Alert severity="info" className="flex justify-center bg-orange-color  absolute w-screen top-0 z-50  "  >{folderState.folderHierarchyForCreate.error}</Alert>
      }
      <></>

      <div className="md:w-screen flex justify-between  " >

        <div style={{ position: 'sticky', left: 0, top: '4rem' }} className="md:w-[17%] md:h-[calc(100vh-4rem)] " >
          <Sidebar />
        </div>


        <div className="w-[66%] h-full py-8 px-12 " >
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
        </div>

        <div style={{ position: 'sticky', right: 0, top: '4rem' }} className="md:w-[17%] md:h-[calc(100vh-4rem)]  " >
          {/* <Rightbar /> */}
        </div>

      </div>
    </div>

  )
}

export default Apps;
