import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

const initialState = {
    loading: false,
    token: "",
    sidebarOpen: false,
}

const reducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen
        },
    },
    // extraReducers: (builder) => {},
})

export const { toggleSidebar } = reducer.actions
export default reducer.reducer
