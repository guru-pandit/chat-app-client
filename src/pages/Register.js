import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../actions/auth.action";
import { loaderToggleAction } from "../actions/common.action";
import { Link } from "react-router-dom";

// const toastOpt = { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, }

const Register = () => {
    const [user, setUser] = useState({ uname: "", phone: "", password: "" })
    const dispatch = useDispatch();
    const history = useHistory();

    // Input onchange handler
    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    // Sumbit register form
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(loaderToggleAction(true));
        dispatch(registerAction(user.uname, user.phone, user.password)).then(() => {
            history.push("/")
        })
    }

    return (
        <>
            <div className='w-full h-full flex justify-center items-center'>
                <div className="w-full max-w-md px-8 pt-6 pb-8 shadow-lg rounded m-6">
                    <div className='mb-2'>
                        <img
                            className="mx-auto h-10 w-auto"
                            src="/images/logo.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-3 text-center text-3xl font-bold text-gray-900">Create an Account</h2>
                    </div>
                    <form className="bg-white p-2" onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Name</label>
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='uname' id="name" type="text" placeholder="Name" onChange={onChangeHandler} />
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Phone</label>
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='phone' id="phone" type="text" placeholder="Phone" onChange={onChangeHandler} />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Password</label>
                            <input className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='password' id="password" type="password" placeholder="Password" onChange={onChangeHandler} />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign up</button>
                            <Link className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800" to='/' >Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
