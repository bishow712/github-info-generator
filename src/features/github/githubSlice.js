import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import githubService from './githubService'

const initialState = {
    gitinfo: [],
    gitrepo: [],
    followers: [],
    following: [],
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

export const fetchRepo = createAsyncThunk('git/repo', async (idName, thunkAPI)=>{
    try {
        return await githubService.gitRepo(idName)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchFollower = createAsyncThunk('git/follower', async (idName, thunkAPI)=>{
    try {
        return await githubService.gitFollower(idName)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const fetchFollowing = createAsyncThunk('git/following', async (idName, thunkAPI)=>{
    try {
        return await githubService.gitFollowing(idName)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// export const fetchLanguage = createAsyncThunk('git/language', async ([idName, name], thunkAPI)=>{
//     try {
//         return await githubService.repoLanguage([idName, name])
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.message || error.toString()
//         return thunkAPI.rejectWithValue(message)
//     }
// })

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
                state.isError=false
                state.gitinfo = action.payload
            })
            .addCase(fetchInfo.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
            .addCase(fetchRepo.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(fetchRepo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError=false
                state.gitrepo = action.payload
            })
            .addCase(fetchRepo.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
            .addCase(fetchFollower.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(fetchFollower.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isError=false
                state.followers = action.payload
            })
            .addCase(fetchFollower.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
            .addCase(fetchFollowing.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(fetchFollowing.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.following = action.payload
            })
            .addCase(fetchFollowing.rejected, (state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message = action.payload
            })
            // .addCase(fetchLanguage.pending, (state)=>{
            //     state.isLoading = true
            // })
            // .addCase(fetchLanguage.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.isSuccess = true
            //     state.language = [...state.language, action.payload]
            // })
            // .addCase(fetchLanguage.rejected, (state,action)=>{
            //     state.isLoading=false
            //     state.isError=true
            //     state.message = action.payload
            // })
    }
})

export const {reset} = githubSlice.actions

export default githubSlice.reducer