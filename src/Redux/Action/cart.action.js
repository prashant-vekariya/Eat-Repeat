import * as ActionType from '../ActionType'

export const cartadddataaction = (data) => (dispatch, getState) => {
        console.log(data)
        dispatch({ type: ActionType.CART_ADD_DATA, payload: data })
}

export const cartgetdataaction = () => (dispatch) => {
        dispatch({ type: ActionType.CART_GET_DATA })
}

export const deletedataaction = (data) => (dispatch) => {
        dispatch({ type: ActionType.DELETE_CART_DATA, payload: data })
}

export const incrementcounter = (id) => (dispatch) => {
        console.log(id)
        dispatch({ type: ActionType.INCREMENT_VALUE, payload: id })
}
export const decrementcounter = (id) => (dispatch) => {
        console.log(id)
        dispatch({ type: ActionType.DECREMENT_VALUE, payload: id })
}