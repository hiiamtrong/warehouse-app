import { createSlice } from '@reduxjs/toolkit'
import LocalStorage from '../libs/local-storages'




export const itemSlice = createSlice({
    name: 'item',
    initialState: {
        item: LocalStorage.getItem() || null,
    },
    reducers: {
        setItem(state, action) {
            state.item = action.payload
            LocalStorage.setItem(action.payload)
        }
    },
})


export const { setItem } = itemSlice.actions

export default itemSlice.reducer