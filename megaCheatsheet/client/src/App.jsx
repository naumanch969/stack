import { Routes, Route, Navigate } from "react-router-dom"
import { Navbar, Sidebar, Rightbar } from "./components"
import { Hero, Code, App, Auth, Debate, Notes, Document, Overview, Activity, Support, Tasks } from "./pages"
import { Snackbar } from "./utils"
import { Alert, Grid } from "@mui/material"
import { ArrowCircleUp, ArrowRightAlt } from "@mui/icons-material"
import { useStateContext } from "./contexts/ContextProvider"
import { useEffect, useState } from "react"

const Apps = () => {

  /////////////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////////////////
  const activeMenu = true
  const screenHeight = window.screen.height
  const screenWidth = window.screen.width
  const parentFolderArr = ['Dashboard', 'Code', 'Apps', 'Others']  // list of titles of all first most folders
  const { noteState, setNoteState, } = useStateContext()

  /////////////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////////////////////
  const { folderState, setFolderState, rightbar, setRightbar } = useStateContext()

  /////////////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////////////////




  return (
    <Grid container className="  max-w-screen min-h-screen overflow-x-clip flex bg-gray-900  " >

      {
        folderState.showAlert &&
        <Alert severity="info" className="flex justify-center bg-orange-color  absolute w-screen top-0 z-50  "  >{folderState.folderHierarchyForCreate.error}</Alert>
      }

      {
        <button className="fixed bottom-[8px] right-[8px] w-[40px] h-[40px] bg-gray-400 z-50 rounded-full " >
          <ArrowCircleUp className="text-[34px] text-gray-300  " />
        </button>
      }



      <Grid item lg={2} md={2.5} sm={3} xs={0} style={{ height: '100vh' }} className="h-screen sticky top-0 " >
        <Sidebar />
      </Grid>

      <Grid item lg={10} md={9.5} sm={9} xs={12} style={{ flexDirection: 'column' }} className="md:w-screen flex  flex-col " >

        <div className="sticky left-0 top-0 z-50 w-full bg-gray-900  " >{/* backdrop-brightness-50  */}
          <Navbar />
        </div>

        <Grid container className="flex justify-between  " >
          <Grid item lg={rightbar ? 9.2 : 12} md={rightbar ? 8.6 : 12} sm={8} xs={12} style={{ background: '#202124' }} className="flex justify-center my-[30px] w-[80%] h-full px-8" >
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path={`/auth`} element={<Auth />} />
              <Route path={`/account`} element={<Hero />} />

              {/* <Route path={`/Notes`} element={<Navigate replace to="/Notes/all" />} /> */}
              <Route path={`/Notes`} element={<Notes />} />
              <Route path={`/Notes/:id`} element={<Notes showSingleNote />} />

              <Route path={`/tasks`} element={<Tasks />} />

              <Route path={`/Document`} element={<Document />} />
              <Route path={`/Overview`} element={<Overview />} />
              <Route path={`/Support`} element={<Support />} />
              <Route path={`/Activity`} element={<Activity />} />

              <Route path={`/Code/:folder/:file`} element={<Code />} />
              <Route path={`/Debate/:folder/:file`} element={<Debate />} />
              <Route path="/Code/:folder/:file" element={<Code />} />
              <Route path={`/Apps/:file`} element={<App />} />        {/* done */}
            </Routes>
          </Grid>

          {/* 57.6px = 3.6rem */}
          <Grid item lg={rightbar ? 2.8 : 0} md={rightbar ? 3.4 : 0} sm={4} xs={0} style={{ height: `calc(100vh - 57.6px)` }} className={`${!rightbar && 'hidden'} bg-gray-900 sticky top-[3.6rem] md:w-[20%] p-[4px] border-l-[7px] border-gray-400 `} >
            <Rightbar />
          </Grid>

        </Grid>


      </Grid>



    </Grid>

  )
}

export default Apps;



// md:h-[calc(100vh-4rem)]
{/*  bg-[#20212433]  */ }
