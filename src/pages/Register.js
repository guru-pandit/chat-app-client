import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerAction } from "../actions/auth.action";
import { loaderToggleAction } from "../actions/common.action";

const Register = () => {
    const history = useHistory();

    // redux selector and dispatch
    const dispatch = useDispatch();

    // Validation schema by yup
    const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string().required().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "Please enter valid phone number"),
        password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/, "Passwords should combination uppercase, lowercase, special characters and numbers (8-12)")
    })

    // form validation hook
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    // Form submit handler
    const onSubmitHandler = (data) => {
        console.log("RegisterOnSubmitHandler:- ", data);
        dispatch(loaderToggleAction(true));
        dispatch(registerAction(data.name, data.phone, data.password)).then(() => {
            history.push("/login");
        })
        reset();
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
                    <form className="bg-white p-2" onSubmit={handleSubmit(onSubmitHandler)}>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Name</label>
                            <input type="text" placeholder="Name" {...register("name")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <p className="text-xs py-px px-2 text-red-600">{errors.name?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="phone">Phone</label>
                            <input type="text" placeholder="Phone" {...register("phone")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <p className="text-xs py-px px-2 text-red-600">{errors.phone?.message}</p>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Password</label>
                            <input type="password" placeholder="Password" {...register("password")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            <p className="text-xs py-px px-2 text-red-600">{errors.password?.message}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign up</button>
                            <Link className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800" to='/login' >Already have an account?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
