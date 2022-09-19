import * as ActionType from "../ActionType"
export const signupaction = (data) => (dispatch) => {
    // console.log(data);
    dispatch({type:ActionType.SIGNUP_USER, payload:data})
}

export const emailverify = (data) => (dispatch) => {
    // console.log(data)
    dispatch({type:ActionType.EMAIL_VERIFIYE, payload:data})
}

export const loginaction = (data) => (dispatch) => {
    console.log(data)
    dispatch({type:ActionType.LOGIN_USER, payload:data})
}

export const loggingaction = (data) => (dispatch) => {
    dispatch({type:ActionType.LOGGING_USER, payload:data})
}

export const logoutaction = () => (dispatch) => {
    dispatch({type:ActionType.LOGOUT_USER})
}

export const loggedoutaction = () => (dispatch) => {
    dispatch({type:ActionType.LOGGEDOUT_USER})
}

export const forgotpasswordaction = (data) => (dispatch) => {
    dispatch({type:ActionType.FORGOTPASSWORD_USER, payload:data})
}

export const googleloginaction = () => (dispatch) => {
    dispatch({type:ActionType.GOOGLELOGIN_USER})
}

export const facebookloginaction = () => (dispatch) => {
    dispatch({type:ActionType.FACEBOOKLOGIN_USER})
}

export const phonenumberloginaction = (data) => (dispatch) => {
    dispatch({type:ActionType.PHONENUMBERLOGIN_USER, payload:data})
}

