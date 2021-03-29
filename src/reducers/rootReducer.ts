import itemReducer from "./itemSlice";
import restockReportReducer from "./restockReportSlice";
import userReducer from "./userSlice";

const rootReducer = {
    auth: userReducer,
    restockReport: restockReportReducer,
    item: itemReducer
}

export type RootState = ReturnType<typeof rootReducer | any>


export default rootReducer