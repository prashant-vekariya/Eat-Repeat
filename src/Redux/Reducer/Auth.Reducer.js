import *as ActionType from "../ActionType"

const initialstate = {
    isLoding: false,
    user: null,
    error: ''
}



export const authReducer = (state = initialstate, action) => {
    switch (action.type) {
        case ActionType.LOGGING_USER:
            return {
                ...state,
                isLoding: false,
                user: action.payload,
                error: ''
            }
        case ActionType.LOGGEDOUT_USER:
            return {
                ...state,
                isLoding: false,
                user: null,
                error: ''
            }

        default:
            return state
    }
}