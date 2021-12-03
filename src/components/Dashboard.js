/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon, LogoutIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ChatSection from './ChatSection';
import { getOldMessagesAction, getUserAction, getOtherUsersAction, } from "../actions/chat.action";
import { connectionFailAction, connectionSuccessAction, logoutAction } from "../actions/auth.action";
import socket from '../services/socket';
import { setConnection } from "../services/chat";
import { toast, ToastContainer } from "react-toastify";

const toastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Dashboard = () => {
    const history = useHistory();
    const authState = useSelector((state) => state.auth);
    const chatState = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authState.isLoggedIn) {
            history.push("/");
        }
        // Connect to the socket
        socket.connect();
        // on connect listener
        socket.on("connect", () => {
            console.log("Connected:- ", socket.id);
            setConnection(authState.user.id, socket.id).then((response) => {
                // console.log("Connected-Response:- ", response.data);
                dispatch(connectionSuccessAction())
            }).catch((err) => {
                console.log("Connected-Response-err", err);
                dispatch(connectionFailAction());
            })
        });
        // on disconnect listener
        socket.on("disconnect", () => {
            console.log("Disconnected... ");
            toast.error("Disconnected...", toastOptions);
            dispatch(connectionFailAction());
        });

        dispatch(getOtherUsersAction(authState.user.id)).then(() => {
            console.log("Other users fetched");
        }).catch((err) => {
            console.log("Other users fetched failed");
        });

        let lastChatUser = JSON.parse(localStorage.getItem("lastChatUser"))
        getUserDetails(lastChatUser?.id)

        return () => socket.disconnect();
    }, []);

    const getUserDetails = (id) => {
        // dispatch(getOldMessagesAction(authState.user.id, id));
        dispatch(getUserAction(id)).then(() => {
            console.log("Get user details success");
        }).catch(() => {
            console.log("Get user details failed");
        });
    }

    const onChatUserSelect = (id) => {
        localStorage.setItem("lastChatUser", JSON.stringify({ id }))
        getUserDetails(id)
    }

    const logoutHandler = () => {
        dispatch(logoutAction());
        history.push("/");
    }

    return (
        <>
            <ToastContainer />
            <div className="min-h-full flex flex-col">
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-8"
                                                src="/images/logo.svg"
                                                alt="Workflow"
                                            />
                                        </div>
                                        {/* <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4"></div>
                                        </div> */}
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <button
                                                type="button"
                                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="ml-3 relative">
                                                <div>
                                                    <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {/* {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <a
                                                                        href={item.href}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        ))} */}
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Your profile
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Settings
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    onClick={logoutHandler}
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border border-red-500"></div> */}
                                <div className="pt-4 pb-3 border-t border-gray-700">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{authState.user.Name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400 mt-1.5">{authState.user.Phone}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 px-2 space-y-1">
                                        {/* {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))} */}
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                        >
                                            Your profile
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                        >
                                            Settings
                                        </Disclosure.Button>
                                        <Disclosure.Button
                                            onClick={logoutHandler}
                                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                                        >
                                            Sign out
                                        </Disclosure.Button>

                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <main className='flex-grow flex '>
                    <div className="flex-grow flex justify-start">
                        {/* left sidebar */}
                        <div className='w-72 bg-gray-800'>
                            <div className='h-full flex flex-col'>
                                <div className="pt-0 mx-1 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search name or group"
                                        className="px-3 py-2 placeholder-gray-300 text-white bg-gray-600 relative rounded text-md border-0 outline-none focus:outline-none w-full" />
                                </div>
                                <div className=''>
                                    {
                                        chatState.otherUsers.map((user) => (
                                            <div key={user.id} onClick={() => onChatUserSelect(user.id)} className="flex items-center p-2 cursor-pointer hover:bg-gray-700">
                                                <div className="flex-shrink-0">
                                                    <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-base font-medium leading-none text-white">{user.Name}</div>
                                                    <div className="text-sm font-normal leading-none text-gray-400 mt-1.5">{user.Phone}</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {/* right sidebar */}
                        <div className='flex-grow'>
                            <ChatSection user={chatState.chatUser} />
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Dashboard;
