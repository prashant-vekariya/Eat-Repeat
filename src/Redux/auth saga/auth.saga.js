import { call, put, takeEvery, all } from 'redux-saga/effects'
import { facebookloginapi, forgotapi, googleloginapi, loginApi, logoutApi, phonenumberloginapi, signupApi } from '../../common/auth.api';
import { history } from '../../history';
import { setAlert } from '../Action/alert.action';
import { emailverify, loggedoutaction, loggingaction } from '../Action/auth.action';
import * as ActionType from "../ActionType"

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* signupuser(action) {
   try {
      const user = yield call(signupApi, action.payload);
      // console.log(user.payload);
      yield put(emailverify(user))
      yield put(setAlert({ text: user.payload, color: 'success' }))
   } catch (e) {
      yield put({ type: "USER_FETCH_FAILED", message: e.message });
      yield put(setAlert({ text: e.payload, color: 'error' }))
   }
}

function* loginuser(action) {
   console.log(action)
   try {
      const user = yield call(loginApi,action.payload)
      console.log(user.payload)
      yield put(loggingaction(user.payload))
      history.push('/')
      yield put(setAlert({ text: "Login Sucessfully", color: 'success' }))
   }
   catch(e){
      yield put(setAlert({ text: e.payload, color: 'error' }))
   }
}

function* logoutuser(action){
   try{
      const user = yield call(logoutApi, action.payload)
      history.push('/')
      yield put(setAlert({text:user.payload, color:'success'}))
      yield put(loggedoutaction())
   }
   catch(e){
      yield put(setAlert({ text: e.payload, color: 'error' }))
   }  
}

function* forgotpassworduser(action){
   try{
      const user = yield call(forgotapi, action.payload)
      history.push('/')
      yield put(setAlert({text:user.payload, color:'success'}))
   }
   catch(e){
      yield put(setAlert({ text: e.payload, color: 'error' }))
   }
}

function* googleloginuser(action){
   try{
      const user = yield call(googleloginapi, action.payload)
      history.push('/')
      yield put(loggingaction(user.payload))
      yield put(setAlert({ text: "Login Sucessfully", color: 'success' }))
   }
   catch(e){
      yield put(setAlert({text:e.payload, color:'error'}))
   }
}

function* facebookloginuser(action){
   try{
      const user = yield call(facebookloginapi, action.payload)
      history.push('/')
      yield put(loggingaction(user.payload))
      yield put(setAlert({text:"Login Sucessfully", color:"success"}))
   }
   catch(e){
      yield put(setAlert({text:e.payload, color:"error"}))
   }
}

// function* phonenumberloginuser(action){
//    try{
//       const user = yield call(phonenumberloginapi,action.payload)
//    }
//    catch(e){
//       yield put(setAlert({text:e.payload}))
//    }
// }



function* watchsignup() {
   yield takeEvery(ActionType.SIGNUP_USER, signupuser);
}

function* watchlogin() {
   yield takeEvery(ActionType.LOGIN_USER, loginuser)
}

function* watchlogout(){
   yield takeEvery(ActionType.LOGOUT_USER, logoutuser)
}

function * forgotpassword(){
   yield takeEvery(ActionType.FORGOTPASSWORD_USER,forgotpassworduser)
}

function * googlelogin(){
   yield takeEvery(ActionType.GOOGLELOGIN_USER,googleloginuser)
}

function* facebooklogin(){
   yield takeEvery(ActionType.FACEBOOKLOGIN_USER, facebookloginuser)
}

// function* phonenumberlogin(){
//    yield takeEvery(ActionType.PHONENUMBERLOGIN_USER, phonenumberloginuser)
// }

export function* authSaga() {
   yield all([
      watchsignup(),
      watchlogin(),
      watchlogout(),
      forgotpassword(),
      googlelogin(),
      facebooklogin(),
      // phonenumberlogin()
   ])
}
