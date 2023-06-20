import { createContext, useContext, useState, useRef } from "react"
import { limitText } from '../utils/functions/function'
import moment from 'moment-timezone'
import Cookie from 'js-cookie'
import { image1, image2, image3, image4, image5, image6 } from '../assets'

const StateContext = createContext();



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
    const resetedDate = { day: currentDay, date: currentDate, month: currentMonth, year: currentYear, hour: currentHour, minute: currentMinute, second: currentSecond }




    // all - general
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [urlPath, setUrlPath] = useState(window.location.pathname.split('/').slice(1,))
    const [rightbar, setRightbar] = useState(false)
    const [showSidebar, setShowSidebar] = useState(true)
    const [showFriendSidebar, setShowFriendSidebar] = useState(true)










    // post authentication
    const initialPost = {
        content: { text: '', selected: [] },
        images: [],
        tags: [],
        hashTags: [],
        likes: [],
        comments: [],
        shares: [],
        styles: {
            background: { show: false, value: '#fff' },
            color: { show: false, value: 'black' },
            fontSize: { show: false, value: '16' },
            fontWeight: { show: false, value: '500' },
        },
        visibility: 'private',
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
    const initialPostState = {
        postsArr: [],
        postData: initialPost,
        postsLength: 0,
        currentPostId: '',
        user: Cookie.get('profile') ? JSON.parse(Cookie.get('profile')) : null,
    }
    const [postState, setPostState] = useState(initialPostState)










    // user authentication


    const [isSignUpPage, setIsSignUpPage] = useState(true)
    const initialUser = { name: '', userName: '', email: '', phone: '', password: '', DOB: '6/2/2005', location: '', profilePicture: '', gender: 'male', bio: '', registeredAt: Date.now(), loginAt: '', friends: [], notifications: [], sendRequests: [], activityLog: [], }
    const initialErrorObj = { login: '', register: '', sendEmailVerificationOTP: '', sendForgetPasswordOTP: '', changePassword: '' }
    const initialUserState = {
        page: 'register',
        usersArr: [],
        accounts: Cookie.get('accounts') ? JSON.parse(Cookie.get('accounts')) : [],
        userData: initialUser,
        userValidation: initialUser,
        errorObj: initialErrorObj,
        usersLength: 0,
        currentUserId: '',
        user: Cookie.get('profile') ? JSON.parse(Cookie.get('profile')) : null,
        isSignUpPage: true
    }
    const [userState, setUserState] = useState(initialUserState)





    // activity section
    const resetedActivity = [
        { time: '1 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '2 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '3 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '4 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '5 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '6 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '7 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '8 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '9 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '10 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '11 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '12 AM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '1 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '2 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '3 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '4 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '5 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '6 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '7 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '8 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '9 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '10 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '11 PM', text: '', uploadedImages: [], links: [], heading: '' },
        { time: '12 PM', text: '', uploadedImages: [], links: [], heading: '' },
    ]
    const resetedBg = { color: 'purple-900', hex: '202124' }
    const resetedActivityData = {
        bg: resetedBg,
        activity: resetedActivity,
        date: resetedDate,
    }
    const initialActivityState = {
        activityArr: [],
        isProvided: { uploadedImages: true, title: true, task: true, status: true, createdAt: true, updatedAt: true, bg: true, favourite: false },
        activityData: resetedActivityData,
        activitiesLength: 0,
        currentActivityId: "",
        activitiesPerPage: 20,
        currentPage: 1,
        currentActivity: { title: '', task: '', status: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'purple-900', hex: '202124' }, favourite: false },
        detailActivity: { title: '', task: '', status: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'purple-900', hex: '202124' }, favourite: false },
        showDetailActivity: false,
        openConfirm: false,
        selectedColor: { color: "gray", hex: "202124" },
        openActivityModal: false,
        openActAccordForCreate: false,
        openActAccordForUpdate: true,
        isGridView: false,
        focusedTimeLapse: 'noFocused',
        focusedTimeLapseId: 'noId',
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
    const [activityState, setActivityState] = useState(initialActivityState)
    const [showActivityForm, setShowActivityForm] = useState(true)
    const [TLLinkValue, setTLLinkValue] = useState('');
    const [TLHeadingValue, setTLHeadingValue] = useState('')    //time lapse Headin value
    const [TLTextValue, setTLTextValue] = useState(``)
    const headingRef = useRef()
    const linkRef = useRef()
    const textRef = useRef()
    const timeLapseContentRef = useRef()









    // task section
    const resetedTaskData = { title: '', task: '', uploadedImages: [], status: 'active', createdAt: `${limitText(Months[currentMonth], 3)} ${currentDate}, ${currentYear}`, updatedAt: '', bg: { color: 'purple-900', hex: '202124' }, favourite: false }
    const initialTasksState = {
        tasksArr: [],
        isProvided: { uploadedImages: true, title: true, task: true, status: true, createdAt: true, updatedAt: true, bg: true, favourite: false },
        taskData: resetedTaskData,
        tasksLength: 0,
        currentTaskId: "",
        tasksPerPage: 20,
        currentPage: 1,
        currentTask: { title: '', task: '', status: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'purple-900', hex: '202124' }, favourite: false },
        detailTask: { title: '', task: '', status: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'purple-900', hex: '202124' }, favourite: false },
        showDetailTask: false,
        openConfirm: false,
        showDeleteMenu: [],
        status: 'completed',                 // filtered tasks  -  all project business personal
        selectedColor: { color: "light-red", hex: "652826" },
        openTaskModal: false,
        taskFormType: 'create',
        openTaskAccordion: true
    }
    const [taskState, setTaskState] = useState(initialTasksState)







    // note section
    const resetedNoteData = { note: '', tags: [], type: 'general', uploadedImages: [], createdAt: `${limitText(Months[currentMonth], 3)} ${currentDate}, ${currentYear}`, updatedAt: '', bg: { color: 'purple-900', hex: '202124' } }
    const initialNotesState = {
        notesArr: [],
        isProvided: { uploadedImages: true, tags: true, note: true, type: true, createdAt: true, updatedAt: true, bg: true, bookmarked: false },
        noteData: resetedNoteData,
        notesLength: 0,
        currentNoteId: "",
        notesPerPage: 20,
        currentPage: 1,
        currentNote: { note: '', tags: [], type: '', uploadedImages: [], createdAt: '', uploadedAt: '', bg: { color: 'purple-900', hex: '202124' } },
        detailNote: {},
        showDetailNote: false,
        openConfirm: false,
        showDeleteMenu: [],
        type: 'all'                 // filtered notes  -  all project business personal
    }
    const [showUpdateNoteForm, setShowUpdateNoteForm] = useState(false)
    const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
    const [selectedColor, setSelectedColor] = useState({ color: 'light-red', hex: '652826' })
    const [noteState, setNoteState] = useState(initialNotesState)






    // code section
    const initialCode = { title: "", code: "", type: "public", tags: [], description: "", comments: [] }
    const initialCodeState = {
        codesArr: [],
        codeBlockData: initialCode,
        codesLength: 0,
        currentId: '',           // id of current/selected post/codeBlock     -  to update 
        expandAllCodes: false,
        showCodes: 'all',
        openCodeModalForUpdate: false,
        codesPerPage: 10,
        currentPage: 1,
        openAccordionOfCreate: false,
        openAccordionOfUpdate: true
    }
    const [codeState, setCodeState] = useState(initialCodeState)










    // sidebar
    const initialFolderState = {
        folderHierarchyForCreate: {},
        folderHierarchyForUpdate: {},
        fileHierarchy: {},
        inputField: { type: 'folder', function: 'create', placeholder: "FolderName" },
        showInputField: false,
        activeFolder: {},
        activeFile: {},
        currentFolderId: '',
        currentFileId: '',
        openDialogue: false,
        showAlert: false,
        closeAllFolders: false,
        isParentFolder: 'unselected',
        isFile: false,
        lastAction: '',
        CRUD: 0
    }
    const [selectedPreDefinedSidebarItem, setSelectedPreDefinedSidebarItem] = useState({ fileName: 'overview' })
    const [openedFolders, setOpenedFolders] = useState({ parentFolder: [], subParentFolder: [], fileName: "" })
    const [folderState, setFolderState] = useState(initialFolderState)
    const [openSidebar, setOpenSidebar] = useState(true)



    return (
        <StateContext.Provider
            value={{
                showSidebar, setShowSidebar,
                currentDate, currentMonth, currentDay, currentYear, currentHour, currentMinute, currentSecond, Months, Days,

                taskState, setTaskState,
                resetedTaskData,

                showSnackbar, setShowSnackbar,
                urlPath, setUrlPath,
                rightbar, setRightbar,
                selectedColor, setSelectedColor,
                showFriendSidebar, setShowFriendSidebar,

                initialPost, initialPostState,
                postState, setPostState,

                resetedActivityData,
                activityState, setActivityState,
                resetedDate, resetedBg, initialActivityState,
                showActivityForm, setShowActivityForm,
                TLLinkValue, setTLLinkValue,
                TLHeadingValue, setTLHeadingValue,
                TLTextValue, setTLTextValue,
                headingRef, linkRef, textRef, timeLapseContentRef,


                resetedNoteData,
                noteState, setNoteState,
                showUpdateNoteForm, setShowUpdateNoteForm,
                showCreateNoteForm, setShowCreateNoteForm,

                selectedPreDefinedSidebarItem, setSelectedPreDefinedSidebarItem,
                openedFolders, setOpenedFolders,
                folderState, setFolderState,
                openSidebar, setOpenSidebar,

                codeState, setCodeState,

                isSignUpPage, setIsSignUpPage,
                userState, setUserState,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}



export const useStateContext = () => useContext(StateContext)