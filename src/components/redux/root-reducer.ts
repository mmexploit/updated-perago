import modalReducer from "./Modal/modal.reducer";
import { combineReducers } from "redux"

const rootReducer = combineReducers({
    modal: modalReducer,
})

export default rootReducer;