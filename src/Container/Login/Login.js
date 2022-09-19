import React, { useState } from 'react';
import { useFormik, Formik, Form } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { facebookloginaction, forgotpasswordaction, googleloginaction, loginaction, phonenumberloginaction, signupaction } from '../../Redux/Action/auth.action';

function Login(props) {

    const [usertype, setUsertype] = useState("login");
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        console.log(values)
        dispatch(loginaction(values))
        formik.resetForm();
    }
    const handlesignup = (values) => {
        // console.log(values)
        dispatch(signupaction(values));
    }

    const googlelogin = () => {
        dispatch(googleloginaction());
    }

    const facebooklogin = () => {
        dispatch(facebookloginaction());
    }

    let loginerror = ({
        email: yup.string().email("Enter a Valid Email").required("Email is Required"),
        password: yup.number().required("Password is Required").positive().integer()
    });

    let signuperror = ({
        email: yup.string().email("Enter a Valid Email").required("Email is Required"),
        password: yup.number().required("Password is Required").positive().integer()
    });


    let forgoterror = ({
        email: yup.string().email("Enter a Valid Email").required("Email is Required"),
    });

    let phonenumbererror = ({
        phonenumber: yup.number().typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(10)
            .required("phoneNumber is Required"),
    });


    let schema, initial;
    if (usertype === 'login') {
        schema = yup.object().shape(loginerror);
        initial = {
            email: '',
            password: ''
        }
    }
    else if (usertype === 'signup') {
        schema = yup.object().shape(signuperror);
        initial = {
            // name: '',
            email: '',
            password: ''
        }
    }
    else if (usertype === 'forgotpassword') {
        schema = yup.object().shape(forgoterror);
        initial = {
            email: ''
        }
    }
    else if (usertype === 'phonenumber') {
        schema = yup.object().shape(phonenumbererror);
        initial = {
            phonenumber: ''
        }
    }

    const formik = useFormik({
        initialValues: initial,
        validationSchema: schema,
        onSubmit: values => {
            {
                if (usertype === "login") {
                    handleLogin(values)
                    formik.resetForm();
                }
                else if (usertype === "signup") {
                    handlesignup(values)
                    formik.resetForm();
                }
                else if (usertype === 'forgotpassword') {
                    // console.log(values)
                    dispatch(forgotpasswordaction(values));
                }
                else if (usertype === 'phonenumber') {
                    // console.log(values)
                    dispatch(phonenumberloginaction(values))
                }
            }
        },
    });


    return (
        <>
            <section className='relative'>
                <div className='otherslider flex items-end '>
                    <div className='container flex justify-center'>
                        {
                            usertype === "login" ?
                                <h1 className='text-white text-4xl font-bold'>Login</h1>
                                :
                                usertype === "signup" ?
                                    <h1 className='text-white text-4xl font-bold'>Sign Up</h1>
                                    :
                                    usertype === "forgotpassword" ?
                                        <h1 className='text-white text-4xl font-bold'>Forgot Password</h1>
                                        :
                                        <h1 className='text-white text-4xl font-bold'>Login (Phone Number)</h1>

                        }
                    </div>
                </div>
            </section>
            <section className='py-28'>
                <div className='flex justify-center'>
                    {
                        usertype === "login" ?
                            <h1 className='text-4xl font-bold mb-9'>Login</h1>
                            :
                            usertype === "signup" ?
                                <h1 className='text-4xl font-bold mb-9'>Sign Up</h1>
                                :
                                usertype === "forgotpassword" ?
                                    <h1 className='text-4xl font-bold mb-9'>Forgot Password</h1>
                                    :
                                    <h1 className='text-4xl font-bold mb-9'>Login (Phone Number)</h1>

                    }
                </div>
                <div className='flex justify-center'>
                    <Formik value={formik}>
                        <Form onSubmit={formik.handleSubmit} className="w-full max-w-sm">
                            <div>
                                {
                                    usertype === 'login' ?
                                        <div>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                        Full Email
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white" type="email" onChange={formik.handleChange} id="email" name="email" />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <div className='text-red-600'>{formik.errors.email}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <div className="md:flex md:items-center mb-6">
                                                <div className="md:w-1/3">
                                                    <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                        Enter Password
                                                    </label>
                                                </div>
                                                <div className="md:w-2/3">
                                                    <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white " type="password" onChange={formik.handleChange} id="password" name="password" />
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <div className='text-red-600'>{formik.errors.password}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        usertype === 'signup' ?
                                            <div>
                                                <div className="md:flex md:items-center mb-6">
                                                    <div className="md:w-1/3">
                                                        <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                            Email For Register
                                                        </label>
                                                    </div>
                                                    <div className="md:w-2/3">
                                                        <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white" type="email" onChange={formik.handleChange} id="email" name="email" />
                                                        {formik.touched.email && formik.errors.email ? (
                                                            <div className='text-red-600'>{formik.errors.email}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                <div className="md:flex md:items-center mb-6">
                                                    <div className="md:w-1/3">
                                                        <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                            Create Password
                                                        </label>
                                                    </div>
                                                    <div className="md:w-2/3">
                                                        <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white " type="password" onChange={formik.handleChange} id="password" name="password" />
                                                        {formik.touched.password && formik.errors.password ? (
                                                            <div className='text-red-600'>{formik.errors.password}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            usertype === 'forgotpassword' ?
                                                <div className="md:flex md:items-center mb-6">
                                                    <div className="md:w-1/3">
                                                        <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                            Your Email
                                                        </label>
                                                    </div>
                                                    <div className="md:w-2/3">
                                                        <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white" type="email" onChange={formik.handleChange} id="email" name="email" />
                                                        {formik.touched.email && formik.errors.email ? (
                                                            <div className='text-red-600'>{formik.errors.email}</div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div className="md:flex md:items-center mb-6">
                                                        <div className="md:w-1/3">
                                                            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                                Your PhoneNumber
                                                            </label>
                                                        </div>
                                                        <div className="md:w-2/3">
                                                            <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white" type="text" onChange={formik.handleChange} id="phonenumber" name="phonenumber" />
                                                            {formik.errors.phonenumber ? (
                                                                <div className='text-red-600'>{formik.errors.phonenumber}</div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    {/* <div className="md:flex md:items-center mb-6">
                                                        <div className="md:w-1/3">
                                                            <label className="block font-bold md:text-right mb-1 md:mb-0 pr-4">
                                                                Enter OTP
                                                            </label>
                                                        </div>
                                                        <div className="md:w-2/3">
                                                            <input className="bg-gray-200 border-2 rounded w-full py-2 px-4 focus:bg-white" type="text" onChange={formik.handleChange} id="phonenumber" name="phonenumber" />
                                                            {formik.errors.phonenumber ? (
                                                                <div>{formik.errors.phonenumber}</div>
                                                            ) : null}
                                                        </div>
                                                    </div> */}
                                                </div>

                                }

                                <div className="md:flex md:items-center">
                                    <div className="md:w-1/3" />
                                    <div className="md:w-2/3">
                                        {
                                            usertype === 'login' ?
                                                <div>
                                                    <div>
                                                        <button className="shadow text-white font-bold py-2 px-4 rounded main-bg-color mr-4" type="submit" onClick={() => setUsertype("login")}>
                                                            Login
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="font-bold mt-2" type="submit" onClick={() => setUsertype("forgotpassword")}>
                                                            Forgot PassWord?
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="font-bold mt-2" type="submit" onClick={() => setUsertype("signup")}>
                                                            You have no account?
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="font-bold mt-2" type="submit" onClick={() => setUsertype("phonenumber")}>
                                                            Login With MobileNumber?
                                                        </button>
                                                    </div>
                                                    <div>
                                                        <button className="m-2" type="submit" onClick={() => googlelogin()}>
                                                            <img src='image/google.png' style={{ height: 30 }} />
                                                        </button>
                                                        <button className="m-2" type="submit" onClick={() => facebooklogin()}>
                                                            <img src='image/facebook.png' style={{ height: 30 }} />
                                                        </button>
                                                    </div>
                                                </div>
                                                :
                                                usertype === 'signup' ?
                                                    <div>
                                                        <button className="shadow text-white font-bold py-2 px-4 rounded main-bg-color" type="submit" onClick={() => setUsertype("signup")}>
                                                            Sign Up
                                                        </button>
                                                        <button className="font-bold mt-2" type="submit" onClick={() => setUsertype("login")}>
                                                            You have already account?
                                                        </button>
                                                    </div>
                                                    :
                                                    usertype === 'forgotpassword' ?
                                                        <button className="shadow text-white font-bold py-2 px-4 rounded main-bg-color mr-4" type="submit" onClick={() => setUsertype("forgotpassword")}>
                                                            Send Email
                                                        </button>
                                                        :
                                                        <button className="font-bold mt-2" type="submit" onClick={() => setUsertype("phonenumber")}>
                                                            Sent Otp
                                                        </button>
                                        }
                                    </div>
                                </div>
                            </div>

                        </Form>
                    </Formik>
                </div>
            </section>
        </>
    );
}

export default Login;