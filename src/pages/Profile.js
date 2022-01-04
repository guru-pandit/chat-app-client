import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import { ImgUpload, Navbar } from '../components';
import { classNames } from '../helpers';
import { update } from '../services/auth';
import { LoadingBarContext } from "../components/LoadingBar";

const Profile = () => {
    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    // States
    const history = useHistory();
    const [profile, setProfile] = useState(null);
    const [submitActive, setSubmitActive] = useState(false);
    const loadingBarRef = useContext(LoadingBarContext);

    // Validation schema by yup
    const schema = yup.object().shape({
        name: yup.string().required(),
        phone: yup.string().required().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "Please enter valid phone number"),
        email: yup.string().email("Please enter valid email"),
        dob: yup.string(),
    })

    // form validation hook
    const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    // On component load
    useEffect(() => {
        if (authState.isLoggedIn) {
            setProfile({ name: authState.user.Name, phone: authState.user.Phone, email: authState.user.Email, dob: authState.user.DOB, })
        } else {
            history.push("/login");
        }
    }, [])
    // On Profile update
    useEffect(() => {
        reset(profile);
    }, [profile])

    // Login form submit handler
    const onSubmitHandler = (data) => {
        console.log("OnSubmitHandler:- ", data);
        setSubmitActive(true);
        loadingBarRef.current.continuousStart();
        update(authState.user.id, data.name, data.phone, data.email, data.dob).then((res) => {
            loadingBarRef.current.complete();
            setSubmitActive(false);
            toast.success("Profile successfully updated");
        }).catch((err) => {
            loadingBarRef.current.complete();
            setSubmitActive(false);
            toast.error(err.response?.data.error);
        });
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
                                    <button className="py-2 px-4 text-indigo-700 font-bold transition-colors duration-150 rounded focus:shadow-outline hover:bg-indigo-50 hover:text-indigo-900">Reset password</button>
                                    {/* <button className={`bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-not-allowed opacity-50 ${!is}`} disabled={!isValid} type="submit" >Save changes</button> */}
                                    <button
                                        className={classNames(
                                            isValid ? '' : ' cursor-not-allowed opacity-50',
                                            'bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                                        )}
                                        disabled={!isValid} type="submit"
                                    >
                                        {submitActive ? "Saving..." : "Save changes"}
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div >
        </>
    )
}

export default Profile
