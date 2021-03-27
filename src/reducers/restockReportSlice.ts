import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import RestockReportAPI from '../api/restockReportAPI'
import LocalStorage from '../libs/localstorages'


export const fetchById = createAsyncThunk(
    '/restock-reports/:restockReportId',
    async (restockReportId: string) => {
        const response = await RestockReportAPI.fetchById(restockReportId)
        console.log(response)
        return response
    }
)

export const restockReportSlice = createSlice({
    name: 'restockReport',
    initialState: {
        restockReport: LocalStorage.getRestockReport() || null,
        item: LocalStorage.getItem() || null
    },
    reducers: {
        setItem(state, action) {
            state.item = action.payload
            LocalStorage.setItem(action.payload)
        }
    },
    extraReducers: {
        [fetchById.fulfilled.toString()]: (state, action) => {
            state.restockReport = action.payload
        }
    }

})


export const { setItem } = restockReportSlice.actions

export default restockReportSlice.reducer