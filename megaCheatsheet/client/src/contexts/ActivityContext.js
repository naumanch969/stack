import { createContext, useContext, useState, useRef } from "react"
import { useStateContext } from "./ContextProvider";

const ActivityContext = createContext();


export const ContextProvider = ({ children }) => {

    // all days months years etc.
    const Months = ['January', 'February', 'Matrch', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let timeZone = moment.tz.guess()
    let currentTime = moment.tz(timeZone)
    const currentDate = currentTime.date()
    const currentMonth = currentTime.month()
    const currentDay = currentTime.day()
    const currentYear = currentTime.year()
    const currentHour = currentTime.hour()
    const currentMinute = currentTime.minute()
    const currentSecond = currentTime.second()

    const headingRef = useRef()


    // variables
    const resetedActivity = [
        { _id: '', time: '1 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '2 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '3 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '4 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '5 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '6 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '7 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '8 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '9 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '10 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '11 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '12 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '1 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '2 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '3 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '4 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '5 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '6 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '7 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '8 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '9 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '10 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '11 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { _id: '', time: '12 PM', text: '', uploadedImages: [], links: [], heading: '' },
    ]
    const resetedDate = { day: currentDay, date: currentDate, month: currentMonth, year: currentYear, hour: currentHour, minute: currentMinute, second: currentSecond }
    const resetedBg = { color: 'gray-900', hex: '202124' }
    const resetedActivityData = {
        bg: resetedBg,
        activity: resetedActivity,
        date: resetedDate,
        _id: ''
    }
    const initialActivityState = {
        activityArr: [],
        isProvided: { uploadedImages: true, title: true, task: true, status: true, createdAt: true, updatedAt: true, bg: true, favourite: false },
        activityData: resetedActivityData,
        activitiesLength: 0,
        currentActivityId: "",
        activitiesPerPage: 20,
        currentPage: 1,
        currentActivity: { title: '', task: '', status: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'gray-900', hex: '202124' }, favourite: false },
        detailActivity: { title: '', task: '', status: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'gray-900', hex: '202124' }, favourite: false },
        showDetailActivity: false,
        openConfirm: false,
        selectedColor: { color: "gray", hex: "202124" },
        openActivityModal: false,
        openActAccordForCreate: false,
        openActAccordForUpdate: true,
        isGridView: false,
        focusedTimeLapse: '',
        filters: {
            timeLapses: true,
            media: true,
            text: true,
            lastDays: false,
            lastWeek: false,
            lastMonth: false,
            custom: false,
            customDate: {
                from: { date: '', month: '', year: '' },
                to: { date: '', month: '', year: '' }
            }
        }
    }


    // states
    const [activityState, setActivityState] = useState(initialActivityState)
    const [showActivityForm, setShowActivityForm] = useState(true)
    const [linkValue, setLinkValue] = useState('');
    const [headingValue, setHeadingValue] = useState('')







    return (
        <ActivityContext.Provider
            value={{
                currentDate, currentMonth, currentDay, currentYear, currentHour, currentMinute, currentSecond, Months, Days,
                headingRef,


                resetedActivityData,
                activityState, setActivityState,
                resetedDate, resetedBg, initialActivityState,
                showActivityForm, setShowActivityForm,


            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}



export const useActivityContext = () => useContext(ActivityContext)