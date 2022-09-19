import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, } from "firebase/auth";
import { auth } from "../firebase"



export const signupApi = (data) => {
    return new Promise(function (resolve, reject) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        sendEmailVerification(user);
                        const uid = user.uid;
                        // console.log("cheack your email")
                    } else {
                        // User is signed out
                    }
                });
            })
            .then((emailafterverify) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        if (user.emailVerified) {
                            resolve({ payload: "Login Sucessfully" });
                        } else {
                            resolve({ payload: "Please Verify Your Email" });
                        }
                    } else {
                        reject({ payload: "somethiing Went Wrong" });
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorCode)
                if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                    reject({ payload: "This email is already register" });
                }
                else if (errorCode.localeCompare("auth/weak-password") === 0) {
                    reject({ payload: "Please Enter Strong Password" });
                }
                else {
                    reject({ payload: errorCode });
                }
            });
    })
}

export const loginApi = (data) => {
    return new Promise(function (resolve, reject) {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => {
                if (user.user.emailVerified) {
                    resolve({ payload: user.user })
                }
                else {
                    reject({ payload: "Email is not Verify" })
                }
            })
            .catch((error) => {
                if (error.code.localeCompare("auth/wrong-password") === 0) {
                    reject({ payload: "Password Is Wrong" })
                }
                else if (error.code.localeCompare("auth/user-not-found") === 0) {
                    reject({ payload: "Please Enter a register email" })
                }
                else {
                    reject({ payload: error.code })
                }
                // console.log(error)
            })
    })
}

export const logoutApi = () => {
    return new Promise(function (resolve, reject) {
        signOut(auth)
            .then((user) => {
                resolve({ payload: 'Logout Sucessfully' })
            })
            .catch((error) => {
                reject({ payload: error.code })
            })
    })
}

export const forgotapi = (data) => {
    console.log(data)
    return new Promise(function (resolve, reject) {
        sendPasswordResetEmail(auth, data.email)
            .then((user) => {
                resolve({ payload: "Please cheack your Email...." })
            })
            .catch((error) => {
                if (error.code.localeCompare("auth/user-not-found") === 0) {
                    reject({ payload: "Please Enter Register Email" })
                }
                else {
                    reject({ payload: error.code })
                }
            })
    })
}

export const googleloginapi = () => {
    return new Promise(function (resolve, reject) {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                // console.log(user);
                resolve({ payload: user })
                // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                reject({ payload: errorCode })
                // ...
            });

    })
}

export const facebookloginapi = () => {
    return new Promise(function (resolve, reject) {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                resolve({ payload: user })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = FacebookAuthProvider.credentialFromError(error);
                reject({ payload: errorCode })
            });

    })
}

// export const phonenumberloginapi = (data) => {
//     // console.log(data)
//     return new Promise(function (resolve, reject) {
//         const code = getCodeFromUserInput();
//         confirmationResult.confirm(code).then((result) => {
//             const user = result.user;
//             resolve({payload:user});
//         }).catch((error) => {
//             reject({payload:error.code})
//         });
//     })
// }