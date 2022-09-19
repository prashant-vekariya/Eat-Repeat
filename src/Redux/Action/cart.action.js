import * as ActionType from '../ActionType'

export const cartadddataaction = (data) => (dispatch) => {
        dispatch({type:ActionType.CART_ADD_DATA, payload:data})
}

export const cartgetdataaction = () => (dispatch) => {
        dispatch({type:ActionType.CART_GET_DATA})
}