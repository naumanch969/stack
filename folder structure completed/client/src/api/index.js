import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5500' })
API.interceptors.request.use((req) => {     // new to me  // for auth middleware. We are giving an token in headers
    if (localStorage.getItem("profile")) {
        const { result } = JSON.parse(localStorage.getItem("profile"))
        const { tokens } = result
        const token = tokens.filter((token) => token.title == 'authorization')[0]
        req.headers.authorization = `Bearer ${token.token}`
    }
    return req
})



// folders
export const getFolders = () => { return API.get("/folder/getFolders") }   // get all users

export const createFolder = (folderData) => { return API.post("/folder/createFolder", folderData) }                 // folderData - {  folderName }
export const createSubFolder = (folderData) => { return API.put("/folder/createSubFolder", folderData) }            // folderData - { parentFolder, folderName }

export const updateFolder = (id, folderData) => { return API.put(`/folder/updateFolder/${id}`, folderData) }        // folderData - {  folderName }
export const updateSubFolder = (id, folderData) => { return API.put(`/folder/updateSubFolder/${id}`, folderData) }  // folderData - { parentFolder, folderName }

export const deleteFolder = (id) => { return API.delete(`/folder/deleteFolder/${id}`) }
export const deleteSubFolder = (id, folderData) => { return API.put(`/folder/deleteSubFolder/${id}`, folderData) }  // folderData - { parentFolder }




// files
export const createFile = (fileData) => { return API.put(`/file/create`, fileData) }           // fileData - { parentFolder, subParentFolder, fileName }
export const updateFile = (id, fileData) => { return API.put(`/file/update/${id}`, fileData) } // fileData - { parentFolder, subParentFolder, fileName }
export const deleteFile = (id, fileData) => { return API.put(`/file/delete/${id}`, fileData) } // fileData - { parentFolder, subParentFolder }




