import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthAPI from '../api/authAPI'
import LocalStorage from '../libs/localstorages'


export const login = createAsyncThunk(
    '/login',
    async ({ username, password }: { username: string, password: string }) => {
        const response = await AuthAPI.login({ username, password })
        const { user, expired, token } = response
        LocalStorage.setUser(user || {})
        LocalStorage.setToken(token)
        LocalStorage.setExpired(expired)
        return response
    }
)

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: LocalStorage.getUser() || {}
    },
    reducers: {
    },
    extraReducers: {
        [login.fulfilled.toString()]: (state, action) => {
            state.user = action.payload
        }
    }

})


export const { } = userSlice.actions

export default userSlice.reducer