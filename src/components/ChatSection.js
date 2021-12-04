import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaperAirplaneIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import socket from "../services/socket";
import { fetchMessages } from "../services/chat";
import { addMessage } from "../actions/chat.action";
import moment from "moment";

const ChatSection = ({ user }) => {
    // console.log("user:-", user);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const authState = useSelector((state) => state.auth);
    const chatState = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const messageEndRef = useRef();

    useEffect(() => {
        // Listnening for private message
        socket.once("private message", (msg) => {
            console.log("Received message:- ", msg);
            let receivedMessage = {
                id: msg.id,
                Body: msg.Body,
                SenderID: msg.SenderID,
                ReceiverID: msg.ReceiverID,
                MessageSentAt: msg.MessageSentAt
            }
            // dispatch(addMessage(receivedMessage));
            fetchMessages(authState.user.id, user.id).then((response) => {
                // console.log("FetchedMessages:- ", response.data);
                setMessages(response.data);
            }).catch((err) => {
                console.log("FetchedMessages-err:- ", err);
            })

            socket.emit("private message received", { MsgID: msg.id, MessageReceivedAt: Date.now() });
        })
    }, [])

    useEffect(() => {
        messageEndRef.current.scrollIntoView()
    }, [messages])

    useEffect(() => {
        fetchMessages(authState.user.id, user.id).then((response) => {
            // console.log("FetchedMessages:- ", response.data);
            setMessages(response.data);
        }).catch((err) => {
            console.log("FetchedMessages-err:- ", err);
        })
    }, [user.id, authState.user.id])

    // Message sumbit handler
    const onSubmitHandler = (e) => {
        e.preventDefault()
        let sendingMessage = {
            Body: message,
            SenderID: authState.user.id,
            ReceiverID: user.id,
            // ReceiverSocketID: user.SocketID,
            MessageSentAt: Date.now()
        }
        // dispatch(addMessage(sendingMessage));

        setMessages([...messages, sendingMessage]);
        console.log("Messages-sending:- ", messages);
        socket.emit("private message", { ...sendingMessage });
    }

    return (
        <div className='w-full h-full flex flex-col'>
            {/* receiver */}
            <div className=''>
                <div className="flex items-center p-2 bg-gray-200">
                    <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full border border-gray-500" src="/images/user_icon.svg" alt="" />
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
                        messages.map((msg, i) => (
                            msg.SenderID == authState.user.id ? (
                                <div key={i} className="flex flex-col self-end max-w-xs bg-gray-100 mb-2 px-3 py-1 rounded-2xl rounded-br-none shadow-sm">
                                    <span className="text-base text-left text-medium text-gray-900">{msg.Body}</span>
                                    <span className="text-right font-normal text-gray-400" style={{ "fontSize": ".7rem" }}>{moment.utc(msg.MessageSentAt).local().format('LT')}</span>
                                </div>
                            ) : (
                                <div key={i} className="flex flex-col self-start max-w-xs bg-indigo-50 mb-2 px-3 py-1 rounded-2xl rounded-bl-none shadow-sm">
                                    <span className="text-base text-left text-medium text-gray-900">{msg.Body}</span>
                                    <span className="text-left font-normal text-gray-400" style={{ "fontSize": ".7rem" }}>{moment.utc(msg.MessageSentAt).local().format('LT')}</span>
                                </div>
                            )
                        ))
                    }
                    <div ref={messageEndRef} />
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
