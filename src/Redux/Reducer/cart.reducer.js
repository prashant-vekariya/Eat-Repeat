import * as ActionType from '../ActionType'

const initialState = {
    isLoding: false,
    cart: [],
    error: ''
}
export const cartReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case ActionType.CART_ADD_DATA:
            return {
                ...state,
                isLoding: false,
                cart: state.cart.concat(action.payload),
                error: ''
            }

        case ActionType.CART_GET_DATA:
            return {
                ...state,
                isLoding: false,
                cart: action.payload,
                error: ''
            }
        default:
            return state
    }
}