/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ChatSection, Conversation, Navbar } from '../components';
import { getConverationsAction, setCurrentChatAction } from "../actions/chat.action";
import { connectionFailAction, connectionSuccessAction } from "../actions/auth.action";
import { searchOthers, createConversation, setConnection } from "../services/chat";
import socket from '../services/socket';

const Dashboard = () => {
    const history = useHistory();
    // const [currentChat, setCurrentChat] = useState(null);
    const [search, setSearch] = useState("");
    const [others, setOthers] = useState([]);

    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth);
    const chatState = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    // check user is logged in or not on first render
    useEffect(() => {
        if (authState.isLoggedIn) {
            // Connect to the socket
            socket.connect();

            // on connect listener
            socket.on("connect", () => {
                console.log("Connected:- ", socket.id);
                setConnection(authState.user?.id, socket.id).then((response) => {
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
                // toast.error("Disconnected...", toastOptions);
                dispatch(connectionFailAction());
            });
        } else {
            history.push("/login");
        }
    }, []);

    // Fetching conversations
    useEffect(() => {
        dispatch(getConverationsAction(authState.user?.id)).then(() => {
            console.log("Conversations fetched");
        }).catch((err) => {
            console.log("Conversations fetched failed");
        });
    }, [authState.user?.id]);

    // on change submit handler or search box
    const searchOnChangeHandler = async (e) => {
        // console.log("SearchOnChangeHandler:- ", e.target.value);
        setSearch(e.target.value);
        await searchOthers(authState.user?.id, e.target.value).then((response) => {
            // console.log("SearchOthers-res", response.data);
            setOthers(response.data);
        }).catch((err) => {
            console.log("SearchOthers-err:- ", err.response);
        })
    }

    // Creating new Conversation
    const createNewConversationHandler = async (othersId) => {
        // console.log("createNewConversationHandler-id:- ", othersId);
        let data = {
            id1: `${authState.user?.id}`,
            id2: `${othersId}`
        }
        await createConversation(data).then((res) => {
            console.log("createConversation-res:- ", res.data);
            dispatch(getConverationsAction(authState.user?.id)).then(() => {
                // console.log("Conversations fetched");
                dispatch(setCurrentChatAction(res.data));
                setOthers([]);
                setSearch("");
            }).catch((err) => {
                console.log("Conversations fetched failed");
            });
        }).catch((err) => {
            console.log("createConversation-err:- ", err.response?.data.error);
        })
    }

    return (
        <>
            <div className="min-h-full flex flex-col">
                <Navbar />
                <main className='flex-grow flex'>
                    <div className="flex-grow flex justify-start">
                        {/* left sidebar */}
                        <div className='w-72 bg-gray-800'>
                            <div className='h-full flex flex-col'>
                                <div className="pt-0 mx-1 mb-4 relative">
                                    <input
                                        type="text"
                                        placeholder="Search name or phone"
                                        className="px-3 py-2 placeholder-gray-300 text-white bg-gray-600 relative rounded text-md border-0 outline-none focus:outline-none w-full"
                                        value={search}
                                        onChange={searchOnChangeHandler} />
                                    <div className='bg-gray-100 absolute w-full'>
                                        {
                                            others.map((oth) => (
                                                <div
                                                    key={oth?.id}
                                                    className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => createNewConversationHandler(oth?.id)}
                                                >
                                                    <div className="flex-shrink-0">
                                                        <img className="h-8 w-8 rounded-full border border-gray-500" src="/images/user_icon.svg" alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium leading-none">{oth?.Name}</div>
                                                        <div className="font-normal leading-none text-gray-500 mt-1" style={{ "fontSize": "0.65rem" }}>{oth?.Phone}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className=''>
                                    {
                                        chatState.conversations.map((conv) => (
                                            <div key={conv.id} onClick={() => dispatch(setCurrentChatAction(conv))}>
                                                <Conversation conversation={conv} currentChat={chatState.currentChat} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {/* right sidebar */}
                        <div className='flex-grow'>
                            {chatState.currentChat && <ChatSection currentChat={chatState.currentChat} />}
                        </div>
                    </div>
                </main >
            </div >
        </>
    )
}

export default Dashboard;
