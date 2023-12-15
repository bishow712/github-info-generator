import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import githubService from './githubService'

const initialState = {
    gitinfo: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const fetchInfo = createAsyncThunk('git/info', async (idName, thunkAPI)=>{
    try {
        return await githubService.gitData(idName)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Creating a Slice
export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {
        reset: (state) =>  initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInfo.pending, (state)=>{
                 state.isLoading = true
            })
            .addCase(fetchInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.gitinfo = action.payload
            })
            .addCase(fetchInfo.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
    }
})

export const {reset} = githubSlice.actions

export default githubSlice.reducer