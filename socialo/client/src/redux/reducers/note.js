import {createSlice} from '@reduxjs/toolkit'

const noteSlice = createSlice({
    name:'note',
    initialState:{
        isFetching:false,
        error:'',
        notes:[],
        currentNote:null
    },
    reducers:{
        start:(state)=>{
            state.isFetching = true
        },
        end:(state)=>{
            state.isFetching = false
        },
        error:(state, action)=>{
            state.error = action.payload
        },
        getNoteReducer:(state, action)=> { 
            state.currentNote = action.payload
        },
        getNotesReducer:(state, action)=> {
            state.notes =action.payload.reverse()
        },
        createNoteReducer:(state, action)=> {
            state.notes= [...state.notes, action.payload]
        },
        updateNoteReducer:(state, action)=> {
            state.notes= state.result.map((note) => note._id == action.payload._id ? action.payload : note)
        },
        deleteNoteReducer:(state, action)=> {
            state.notes = state.result.filter((note) => note._id !== action.payload?._id)
        },
    }
})

export default noteSlice.reducer
export const {
    start,
    end,
    error,
    getNoteReducer,
    getNotesReducer,
    createNoteReducer,
    updateNoteReducer,
    deleteNoteReducer,
} = noteSlice.actions