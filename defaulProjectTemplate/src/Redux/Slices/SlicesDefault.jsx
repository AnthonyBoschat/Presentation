import {createSlice} from "@reduxjs/toolkit"

const defaultSlice = createSlice({
    name:"",
    initialState:{},
    reducers:{},
})

export const defaultSliceReducer = defaultSlice.reducer
export const {} = defaultSlice.actions