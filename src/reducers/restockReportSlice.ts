import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import RestockReportAPI from '../api/restockReportAPI'
import LocalStorage from '../libs/local-storages'


export const fetchById = createAsyncThunk(
    '/restock-reports/:restockReportId',
    async (restockReportId: string, { rejectWithValue }) => {
        try {
            const response = await RestockReportAPI.fetchById(restockReportId)
            LocalStorage.setRestockReport(response)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

export const countMobile = createAsyncThunk(
    '/restock-reports/:restockReportId/count-mobile/:itemIndex',
    async ({ restockReportId, itemIndex, quantity }: { restockReportId: string, itemIndex: number, quantity: number }, { rejectWithValue }) => {
        try {
            const response = await RestockReportAPI.countMobile(restockReportId, itemIndex, quantity)
            LocalStorage.setRestockReport(response)
            return response
        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


export const restockReportSlice = createSlice({
    name: 'restockReport',
    initialState: {
        restockReport: LocalStorage.getRestockReport() || null,
        item: LocalStorage.getItem() || null,
        waiting: false
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
            state.waiting = false
        },
        [fetchById.rejected.toString()]: (state, action) => {
            state.waiting = false
            throw action.payload
        },
        [fetchById.pending.toString()]: (state) => {
            state.waiting = true
        },

        [countMobile.fulfilled.toString()]: (state, action) => {
            state.restockReport = action.payload
            state.waiting = false
        },
        [countMobile.rejected.toString()]: (state, action) => {
            state.waiting = false
            throw action.payload
        },
        [countMobile.pending.toString()]: (state) => {
            state.waiting = true
        },
    }

})


export const { setItem } = restockReportSlice.actions

export default restockReportSlice.reducer