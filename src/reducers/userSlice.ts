import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthAPI from '../api/authAPI'
import LocalStorage from '../libs/localstorages'



export const login = createAsyncThunk(
    '/login',
    async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await AuthAPI.login({ username, password })

            const { user, expired, token } = response
            LocalStorage.setUser(user || {})
            LocalStorage.setToken(token)
            LocalStorage.setExpired(expired)
            return response.user
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: LocalStorage.getUser() || {},
        error: null
    },
    reducers: {
    },
    extraReducers: {
        [login.fulfilled.toString()]: (state, action) => {
            state.user = action.payload

        },
        [login.rejected.toString()]: (state, action) => {
            state.error = action.payload
        }
    },

})


export const { } = userSlice.actions

export default userSlice.reducer