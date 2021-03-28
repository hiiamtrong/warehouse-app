import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthAPI from '../api/authAPI'
import { REDUX_STATUS } from '../constants'
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
            return { token, user }
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const userSlice = createSlice({
    name: 'auth',
    initialState: {
        user: LocalStorage.getUser() || {},
        waiting: false,
        token: LocalStorage.getToken() || '',
    },
    reducers: {
    },
    extraReducers: {
        [login.fulfilled.toString()]: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.waiting = false

        },
        [login.rejected.toString()]: (state, action) => {
            state.waiting = false
        },
        [login.pending.toString()]: (state) => {
            state.waiting = true
        }
    },

})


export const { } = userSlice.actions

export default userSlice.reducer