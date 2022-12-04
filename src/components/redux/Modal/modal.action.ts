import { ModalActionTypes } from "./modal.types";

export const toogleModalOpen = () => ({
    type: ModalActionTypes.TOGGLE_MODAL_OPEN
})

export const populateModalData = data => ({
    type: ModalActionTypes.POPULATE_MODAL_DATA,
    payload: data
})