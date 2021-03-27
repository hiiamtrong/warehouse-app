import restockReportReducer from "./restockReportSlice";
import userReducer from "./userSlice";

const rootReducer = {
    auth: userReducer,
    restockReport: restockReportReducer
}

export type RootState = ReturnType<typeof rootReducer | any>


export default rootReducer