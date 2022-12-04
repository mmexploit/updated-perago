import {createSelector} from "reselect"

const selectModal = (state) => state.modal;

export const selectModalHidden = createSelector(
    [selectModal],
    modal => modal.hidden
)

export const selectModalData = createSelector(
    [selectModal],
    modal => modal.modalData
)