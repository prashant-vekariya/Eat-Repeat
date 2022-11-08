import * as ActionType from '../ActionType'

const initialstate = {
    isLoding: false,
    cart: [],
    error: ''
}
export const cartReducer = (state = initialstate, action) => {
    console.log(action.type, action.payload)
    switch (action.type) {
        case ActionType.CART_GET_DATA:
            return {
                ...state,
                isLoding: false,
                error: ''
            }
        case ActionType.CART_ADD_DATA:
            console.log(action.payload.id)
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push(action.payload);
            }
            return {
                ...state,
                isLoding: false,
                error: ''
    }
        case ActionType.DELETE_CART_DATA:
return {
    ...state,
    isLoding: false,
    cart: state.cart.filter((c) => (c.id !== action.payload)),
    error: ''
}
        case ActionType.INCREMENT_VALUE:
return {
    ...state,
    isLoding: false,
    cart: state.cart.map((c) => {
        if (c.id === action.payload) {
            return {
                id: c.id,
                quantity: c.quantity + 1
            }
        } else {
            return c
        }
    }),
    error: ''
}
        case ActionType.DECREMENT_VALUE:
return {
    ...state,
    isLoding: false,
    cart: state.cart.map((c) => {
        if (c.id === action.payload) {
            return {
                id: c.id,
                quantity: c.quantity - 1
            }
        } else {
            return c
        }
    }),
    error: ''
}
        default:
return state
    }



}