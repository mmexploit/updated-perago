import { ModalActionTypes } from "./modal.types";

const INITIAL_STATE = {
    hidden: true,
    modalData: { data : { attributes : { Description: "", Email: ""}}, name: "Null"}
}

const modalReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ModalActionTypes.TOGGLE_MODAL_OPEN:
            return {
                ...state,
                hidden: !state.hidden
            }
        case ModalActionTypes.POPULATE_MODAL_DATA:
            return {
                ...state,
                modalData: action.payload
            }
        default:
            return state
    }
}

export default modalReducer;