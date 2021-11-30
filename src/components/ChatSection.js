import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { PaperAirplaneIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import axios from "../services/axios";
import { addMessage } from "../actions/chat.action";

const ChatSection = ({ user }) => {
    console.log("ChatSection-props:- ", user);
    const [message, setMessage] = useState("");
    const authState = useSelector((state) => state.auth);
    const chatState = useSelector((state) => state.chat);
    console.log("ChatState-msgs:- ", chatState.messages);
    const dispatch = useDispatch();

    const socket = useRef();

    useEffect(() => {
        let baseUrl = process.env.SERVER || "http://localhost:4000"
        socket.current = io(baseUrl);
        socket.current.on("connect", () => {
            console.log("Connected:- ", socket.current.id);
            axios.post("/set-connection", { UserID: authState.user.id, SocketID: socket.current.id }).then((response) => {
                console.log("Connected-Response:- ", response.data);
            }).catch((err) => {
                console.log("Connected-Response-err", err);
            })
        });

        socket.current.on("message", (msg) => {
            console.log("Received message:- ", msg);
            let receivedMessage = {
                Body: msg.Body,
                SenderID: msg.SenderID,
                ReceiverID: msg.ReceiverID,
            }
            dispatch(addMessage(receivedMessage));
        })

        return () => socket.current.disconnect();
    }, [])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        let sendingMessage = {
            Body: message,
            SenderID: authState.user.id,
            ReceiverID: user.id,
            ReceiverSocketID: user.SocketID,
        }
        dispatch(addMessage(sendingMessage));

        socket.current.emit("message", { ...sendingMessage });
    }

    return (
        <div className='w-full h-full flex flex-col'>
            {/* receiver */}
            <div className=''>
                <div className="flex items-center p-2 bg-gray-200">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    </div>
                    <div className="flex-grow ml-3">
                        <div className="text-base font-semibold leading-none text-gray-900">{user.Name}</div>
                        <div className="text-sm font-normal leading-none text-gray-600 mt-1.5">{user.Phone}</div>
                    </div>
                    <div className="mx-4 cursor-pointer">
                        <DotsVerticalIcon className="h-5 w-5 text-lg text-gray-600" />
                    </div>
                </div>
            </div>
            {/* messages */}
            <div className='flex-grow'>
                <div className="h-full w-full overflow-y-auto flex flex-col px-3 my-3" style={{ "maxHeight": "440px" }} >
                    {
                        chatState.messages.map((msg, i) => (
                            msg.SenderID == authState.user.id ? (
                                <div key={i} className="flex flex-col self-end max-w-xs bg-gray-100 mb-2 px-3 py-1 rounded-2xl rounded-br-none shadow-sm">
                                    <span className="text-base text-left text-medium text-gray-900">{msg.Body}</span>
                                    {/* <span className="text-xs text-right font-normal text-gray-400">08:00 am</span> */}
                                </div>
                            ) : (
                                <div key={i} className="flex flex-col self-start max-w-xs bg-indigo-50 mb-2 px-3 py-1 rounded-2xl rounded-bl-none shadow-sm">
                                    <span className="text-base text-left text-medium text-gray-900">{msg.Body}</span>
                                    {/* <span className="text-xs text-left font-normal text-gray-400">08:02 am</span> */}
                                </div>
                            )
                        ))
                    }
                </div>
            </div>
            <div className=''>
                <form className="bg-white px-5" onSubmit={onSubmitHandler}>
                    <div className="flex items-center py-2">
                        <input
                            className="shadow-sm bg-gray-100 appearance-none border border-gray-300 rounded-full w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='message'
                            id="message"
                            type="text"
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="p-2 ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline" type="submit">
                            <PaperAirplaneIcon className='h-5 w-5' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatSection
