import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PaperAirplaneIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import moment from "moment";
import socket from "../services/socket";
import { fetchMessages, getUser, addMessage, updateMessage } from "../services/chat";

const ChatSection = ({ currentChat }) => {
    // console.log("user:-", user);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [user, setUser] = useState(null);
    const authState = useSelector((state) => state.auth);

    const messageEndRef = useRef();

    useEffect(() => {
        console.log("CurrentChat:- ", currentChat);
    }, [currentChat])
    useEffect(() => {
        console.log("User:- ", user);
    }, [user])


    // Fetching friends details
    useEffect(() => {
        // console.log("CurrentChat:- ", currentChat);
        const friendsID = currentChat?.Members?.find((f) => f != authState.user.id);
        // console.log("friendsID:- ", friendsID);

        getUser(friendsID).then((response) => {
            // console.log("GetUser-res", response.data);
            setUser(response.data);
        }).catch((err) => {
            console.log("GetUser-err:- ", err);
        })
    }, [currentChat, authState.user.id]);

    // Fetching messages
    useEffect(() => {
        fetchMessages(currentChat?.id).then((response) => {
            // console.log("FetchMessages:- ", response.data);
            setMessages(response.data);
        }).catch((err) => {
            if (err.response.status == 400) {
                console.log("FetchMessages-err:- ", err.response.data.error);
                setMessages([]);
            }
        })
    }, [currentChat]);

    // Checking arriving message
    useEffect(() => {
        // Listnening for private message
        socket.once("private message", (msg) => {
            console.log("Received message:- ", msg);
            setArrivalMessage(msg)
            // sending received time to backend
            updateMessage(msg.id, { MessageReceivedAt: Date.now() }).then((response) => {
                // console.log("MessageUpdated", response.data);
            }).catch((err) => {
                console.log("MessageUpdated-err:- ", err);
            })
        })
    }, [])

    // dding arrival message to the messages array
    useEffect(() => {
        arrivalMessage && currentChat?.Members.includes(arrivalMessage.SenderID.toString()) && setMessages([...messages, arrivalMessage])
    }, [arrivalMessage, currentChat])

    // make chat box always scroll down
    useEffect(() => {
        messageEndRef.current.scrollIntoView()
    }, [messages])

    // Message sumbit handler
    const onSubmitHandler = (e) => {
        e.preventDefault()
        let sendingMessage = {
            Body: message,
            SenderID: authState.user.id,
            ReceiverID: user.id,
            ConversationID: currentChat.id,
            MessageSentAt: Date.now()
        }

        socket.emit("private message", sendingMessage);
        setMessages([...messages, sendingMessage])
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
                        <div className="text-base font-semibold leading-none text-gray-900">{user?.Name}
                            {
                                user?.ConnectionDetail.IsConnected ? <span className="h-2.5 w-2.5 p-.5 ml-1.5 inline-block border-4 border-green-500 rounded-full ">  </span> : null
                            }
                        </div>
                        <div className="text-sm font-normal leading-none text-gray-600 mt-1.5">{user?.Phone}</div>
                    </div>
                    <div className="mx-4 cursor-pointer">
                        <DotsVerticalIcon className="h-5 w-5 text-lg text-gray-600" />
                    </div>
                </div>
            </div>
            {/* messages */}
            <div className='flex-grow'>
                <div className="h-full w-full overflow-y-auto flex flex-col justify-end px-3 my-3" style={{ "maxHeight": "440px" }} >
                    {
                        messages?.map((msg, i) => (
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
                        <button className="p-2 ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full focus:outline-none focus:shadow-outline transform rotate-90" type="submit">
                            <PaperAirplaneIcon className='h-5 w-5' />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatSection
