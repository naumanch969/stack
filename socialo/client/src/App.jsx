import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from 'react'
import { useStateContext } from './contexts/ContextProvider'
import Cookie from 'js-cookie'
import { Auth, Web } from './Web/pages'
import {
  Home, FriendsPage as Friends, Groups, Collections, Notifications, Create, Profile, More,
  Dashboard, Notes, Activity, Tasks, Document, Calender, Calculator, Kanban
} from "./App/pages"
import { getAllUsers } from './store/actions/user'
import AppPageWrapper from './wrapper/AppPageWrapper'
import DashboardWrapper from './wrapper/DashboardWrapper'
import WebPageWrapper from './wrapper/WebPageWrapper'
import { useSelector, useDispatch } from 'react-redux'

const Apps = () => {
  const { userState, setUserState } = useStateContext()

  //////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch()

  //////////////////////////// STATES ///////////////////////////////////////

  //////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  //////////////////////////// FUNCTIONS /////////////////////////////////////


  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex bg-purple-100   " >
      <Routes>

        {/* web */}
        <Route path='/' element={<Navigate replace to='/main' />} />
        <Route path='/main' element={<WebPageWrapper Component={Web} />} />
        <Route path='/auth' element={<WebPageWrapper Component={Auth} />} />

        {/* app */}
        <Route path="/app" element={<Navigate replace to='/app/home' />} />
        <Route path="/app/home" element={<AppPageWrapper Component={Home} />} />
        <Route path={`/app/friends`} element={<AppPageWrapper Component={Friends} />} />
        <Route path={`/app/friends/:selectedItem`} element={<AppPageWrapper Component={Friends} />} />
        <Route path={`/app/friends/:selectedItem/:accountId`} element={<AppPageWrapper Component={Friends} account />} />
        <Route path={`/app/groups`} element={<AppPageWrapper Component={Groups} />} />
        <Route path={`/app/collections`} element={<AppPageWrapper Component={Collections} />} />
        <Route path={`/app/notifications`} element={<AppPageWrapper Component={Notifications} />} />
        <Route path={`/app/notifications/:notificationId`} element={<AppPageWrapper Component={Notifications} />} />
        <Route path={`/app/create`} element={<AppPageWrapper Component={Create} />} />
        <Route path={`/app/profile`} element={<AppPageWrapper Component={Profile} />} />
        <Route path={`/app/more`} element={<AppPageWrapper Component={More} />} />

        <Route path="/app/dashboard" element={<Navigate replace to='/app/dashboard/overview' />} />
        <Route path={`/app/dashboard/overview`} element={<DashboardWrapper Component={Dashboard} />} />
        <Route path={`/app/dashboard/notes`} element={<DashboardWrapper Component={Notes} />} />
        <Route path={`/app/dashboard/activity`} element={<DashboardWrapper Component={Activity} />} />
        <Route path={`/app/dashboard/tasks`} element={<DashboardWrapper Component={Tasks} />} />
        <Route path={`/app/dashboard/document`} element={<DashboardWrapper Component={Document} />} />
        <Route path={`/app/dashboard/apps/calender`} element={<DashboardWrapper Component={Calender} />} />
        <Route path={`/app/dashboard/apps/calculator`} element={<DashboardWrapper Component={Calculator} />} />
        <Route path={`/app/dashboard/apps/kanban`} element={<DashboardWrapper Component={Kanban} />} />

      </Routes>
    </div>
  )
}
export default Apps;