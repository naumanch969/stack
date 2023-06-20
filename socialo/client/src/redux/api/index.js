import axios from 'axios'
import Cookie from 'js-cookie'

const API = axios.create({ baseURL: 'http://localhost:5000' })
API.interceptors.request.use((req) => {
    if (Cookie.get('profile')) {
        const result = JSON.parse(Cookie.get('profile'))
        const { tokens } = result
        tokens.map(token => {
            req.headers[token.name] = token.token
        })
    }
    return req
})



// friends
export const sendFriendRequest = (receiverId, type, content) => { return API.put(`/user/friend/send-request/${receiverId}`, { content, type }) }
export const removeFriendRequest = (receiverId) => { return API.put(`/user/friend/remove-request/${receiverId}`) }
export const acceptFriendRequest = (senderId) => { return API.put(`/user/friend/accept-request/${senderId}`) }


// users
export const getAllUsers = () => { return API.get(`/user/get-all-users`) }
export const sendEmailVerificationOTP = (email) => API.post('/user/send-register-otp', { email })
export const register = (userData) => API.post('/user/register', userData)          // {name, email, password, phone, otp}
export const login = (userData) => API.put('/user/login', userData)
export const removeAccount = (email) => API.put('/user/remove', { email })
export const sendForgetPasswordOTP = (email) => API.post('/user/send-forget-password-otp', { email })
export const changePassword = (userData) => API.put('/user/change-password', userData)


// post
export const getPosts = () => { return API.get(`/post/get-all-posts`) }
export const getUserPosts = (id) => { return API.get(`/post/get-user-posts/${id}`) }
export const createPost = (postData) => { return API.post(`/post/create`, postData) }
export const likePost = (id) => { return API.put(`/post/like/${id}`) }
export const commentpost = (id) => { return API.put(`/post/comment`, id) }
export const deletePost = (id) => { return API.put(`/post/delete/${id}`) }



// Task
export const getTask = (id) => { return API.get(`/task/getTask/${id}`) }
export const getTasks = () => { return API.get(`/task/getTasks`) }
export const getUserTasks = () => { return API.get(`/task/getUserTasks`) }
export const createTask = (taskData) => { return API.post("/task/createTask", taskData) }                           //taskData - { title, task, tags, uploadedImages, createdAt, updatedAt, bg, favourite, status }
export const updateTask = (id, taskData) => { return API.put(`/task/updateTask/${id}`, taskData) }
export const deleteTask = (id) => { return API.delete(`/task/deleteTask/${id}`) }



// Activity
export const getActivity = (id) => { return API.get(`/activity/getActivity/${id}`) }
export const getActivities = () => { return API.get(`/activity/getActivities`) }
export const getUserActivities = () => { return API.get(`/activity/getUserActivities`) }

export const createActivity = (noteData) => { return API.post("/activity/createActivity", noteData) }               //activityData - {  detail, tags, uploadedImages, date, bg }

export const updateActivity = (id, noteData) => { return API.put(`/activity/updateActivity/${id}`, noteData) }
export const updateBg = (id, bg) => { return API.put(`/activity/updateBg/${id}`, bg) }
export const addLink = (activityId, linkData) => { return API.put(`/activity/addLink/${activityId}`, linkData) }            // link, timeLapseId
export const updateLink = (activityId, linkData) => { return API.put(`/activity/updateLink/${activityId}`, linkData) }      // link, timeLapseId, linkId
export const deleteLink = (activityId, linkData) => { return API.put(`/activity/deleteLink/${activityId}`, linkData) }      // timeLapseId, linkId
export const updateHeading = (id, headingData) => { return API.put(`/activity/updateHeading/${id}`, headingData) }          // timeLapseID, heading
export const updateText = (id, textData) => { return API.put(`/activity/updateText/${id}`, textData) }                  // timeLapseID, heading
export const addImage = (id, imageData) => { return API.put(`/activity/addImage/${id}`, imageData) }                    // timeLapseID, file, url
export const deleteImage = (id, imageData) => { return API.put(`/activity/deleteImage/${id}`, imageData) }              // timeLapseID, file, url


export const deleteActivity = (id) => { return API.delete(`/activity/deleteActivity/${id}`) }



// notes
export const getNote = (id) => { return API.get(`/note/getNote/${id}`) }
export const getNotes = () => { return API.get(`/note/getNotes`) }
export const getUserNotes = () => { return API.get(`/note/getUserNotes`) }
export const createNote = (noteData) => { return API.post("/note/createNote", noteData) }               //noteData - {  note, tags, uploadedImages, type, createdAt, updatedAt, bg }
export const updateNote = (id, noteData) => { return API.put(`/note/updateNote/${id}`, noteData) }
export const bookmarkNote = (id) => { return API.put(`/note/bookmarkNote/${id}`) }
export const deleteNote = (id) => { return API.delete(`/note/deleteNote/${id}`) }


// codes
export const getCode = (id) => { return API.get(`/code/getCode/${id}`) }
export const getCodes = () => { return API.get(`/code/getCodes`) }
export const createCode = (codeData) => { return API.post("/code/create", codeData) }
export const updateCode = (id, codeData) => { return API.put(`/code/update/${id}`, codeData) }
export const likeCode = (id) => { return API.put(`/code/like/${id}`) }
export const commentCode = (id, comment) => { return API.put(`/code/comment/${id}`, comment) }
export const deleteCode = (id) => { return API.delete(`/code/delete/${id}`) }



// folders
export const getFolders = () => { return API.get("/folder/getFolders") }   // get all users

export const createFolder = (folderData) => { return API.post("/folder/createFolder", folderData) }                 // folderData - {  folderName }
export const createSubFolder = (folderData) => { return API.put("/folder/createSubFolder", folderData) }            // folderData - { parentFolder, folderName }

export const updateFolder = (id, folderData) => { return API.put(`/folder/updateFolder/${id}`, folderData) }        // folderData - {  folderName }
export const updateSubFolder = (id, folderData) => { return API.put(`/folder/updateSubFolder/${id}`, folderData) }  // folderData - { parentFolder, folderName }

export const deleteFolder = (id) => { return API.delete(`/folder/deleteFolder/${id}`) }
export const deleteSubFolder = (id, folderData) => { return API.put(`/folder/deleteSubFolder/${id}`, folderData) }  // folderData - { parentFolder }




// files
export const createFile = (fileData) => { return API.put(`/file/createFile`, fileData) }                    // fileData - { parentFolder, fileName }
export const createSubFile = (fileData) => { return API.put(`/file/createSubFile`, fileData) }             // fileData - { parentFolder, subParentFolder, fileName }

export const updateFile = (id, fileData) => { return API.put(`/file/updateFile/${id}`, fileData) }          // fileData - { parentFolder,  fileName }
export const updateSubFile = (id, fileData) => { return API.put(`/file/updateSubFile/${id}`, fileData) }    // fileData - { parentFolder, subParentFolder, fileName }

export const deleteFile = (id, fileData) => { return API.put(`/file/deleteFile/${id}`, fileData) }          // fileData - { parentFolder }
export const deleteSubFile = (id, fileData) => { return API.put(`/file/deleteSubFile/${id}`, fileData) }    // fileData - { parentFolder, subParentFolder }
