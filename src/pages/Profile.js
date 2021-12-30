import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ImgUpload, Navbar } from '../components';

const Profile = () => {
    const history = useHistory();

    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [profile, setProfile] = useState(null);

    // Validation schema by yup
    const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string().required().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "Please enter valid phone number"),
        email: yup.string().email("Please enter valid email"),
        dob: yup.string(),
    })

    // form validation hook
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

    // On component load
    useEffect(() => {
        if (authState.isLoggedIn) {
            setProfile({
                name: authState.user.Name,
                phone: authState.user.Phone,
                email: authState.user.Email,
                dob: "1995-02-28",
            })
        } else {
            history.push("/login");
        }
    }, [])
    // On Profile update
    useEffect(() => {
        reset(profile)
    }, [profile])

    // Login form submit handler
    const onSubmitHandler = (data) => {
        console.log("OnSubmitHandler:- ", data);
        // dispatch(loaderToggleAction(true));
    }

    return (
        <>
            <div className="min-h-full flex flex-col">
                <Navbar />
                <main className='flex-grow flex'>
                    <div className="flex-grow flex justify-start max-w-screen-md mx-auto pt-4">
                        <div className=''>
                            <div className='p-2'>
                                <ImgUpload />
                            </div>
                        </div>
                        <div className='flex-1 px-4'>
                            <h3 className='text-2xl font-bold text-gray-700 p-2 tracking-wide'>Profile</h3>
                            <form className="bg-white p-2" onSubmit={handleSubmit(onSubmitHandler)}>
                                <div className="mb-3">
                                    <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="name">Name</label>
                                    <input type="text" placeholder="Name" {...register("name")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <p className="text-xs py-px px-2 text-red-600">{errors.name?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="password">Phone</label>
                                    <input type="text" placeholder="Phone" {...register("phone")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <p className="text-xs py-px px-2 text-red-600">{errors.phone?.message}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="email">Email</label>
                                    <input type="email" placeholder="Email" {...register("email")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <p className="text-xs py-px px-2 text-red-600">{errors.password?.message}</p>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-600 text-sm font-bold mb-1" htmlFor="dob">Birth Date</label>
                                    <input type="date" placeholder="Date" {...register("dob")} className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                    <p className="text-xs py-px px-2 text-red-600">{errors.password?.message}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <button class="py-2 px-4 text-indigo-700 font-bold transition-colors duration-150 rounded focus:shadow-outline hover:bg-indigo-50 hover:text-indigo-900">Reset password</button>
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="submit" >Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Profile
