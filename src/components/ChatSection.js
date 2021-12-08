import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

import socket from "../services/socket";
import { fetchMessages, getUser, updateMessage } from "../services/chat";
import { setMessagesAction } from "../actions/chat.action";
import ChatUser from "./ChatUser";
import Message from './Message';

const ChatSection = ({ currentChat }) => {
    const [message, setMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [user, setUser] = useState(null);

    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth);
    const chatState = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    // Follwing method runs if currentChat update
    useEffect(() => {
        console.log("CurrentChat:- ", currentChat);
    }, [currentChat])
    // Follwing method runs if user update
    useEffect(() => {
        console.log("User:- ", user);
    }, [user])

    // Checking arriving message
    useEffect(() => {
        // Listnening for private message
        socket.on("private message", (msg) => {
            console.log("Received message:- ", msg);
            setArrivalMessage(msg)
            // sending received time to backend
            updateMessage(msg.id, { MessageReceivedAt: Date.now(), IsReceived: true, IsRead: true, ConversationID: msg.ConversationID, SenderID: msg.SenderID }).then((response) => {
                // console.log("MessageUpdated", response.data);
            }).catch((err) => {
                console.log("MessageUpdated-err:- ", err);
            })
        })

        // message received by receiver event listener
        socket.on("receiver received private message", (msg) => {
            if (msg.ConversationID == currentChat?.id) {
                fetchMessages(currentChat?.id).then((response) => {
                    dispatch(setMessagesAction(response.data));
                })
            }
        })

        // Message receieved by server event listener
        socket.on("server received private message", (msg) => {
            // console.log("ServerReceivedPrivateMessage:- ", msg);
            if (msg.ConversationID == currentChat?.id) {
                fetchMessages(currentChat?.id).then((response) => {
                    dispatch(setMessagesAction(response.data));
                })
            }
        })
    }, [])

    // Fetching friends details
    useEffect(() => {
        // console.log("CurrentChat:- ", currentChat);
        const friendsID = currentChat?.Members?.find((f) => f != authState.user.id);
        // console.log("friendsID:- ", friendsID);
        getUser(friendsID).then((response) => {
            // console.log("GetUser-res", response.data);
            setUser(response.data);
        }).catch((err) => {
            console.log("GetUser-err:- ", err.response?.data.error);
        })
    }, [currentChat, authState.user.id]);

    // Fetching messages
    useEffect(() => {
        fetchMessages(currentChat?.id).then((response) => {
            // console.log("FetchMessages:- ", response.data);
            dispatch(setMessagesAction(response.data));
        }).catch((err) => {
            if (err.response.status == 400) {
                console.log("FetchMessages-err:- ", err.response?.data.error);
                dispatch(setMessagesAction([]));
            }
        })
    }, [currentChat]);

    // adding arrival message to the messages array
    useEffect(() => {
        arrivalMessage && currentChat?.Members.includes(arrivalMessage.SenderID.toString()) && dispatch(setMessagesAction([...chatState.messages, arrivalMessage]))
    }, [arrivalMessage, currentChat])

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

        // emiting socket event for private message and then adding message the array
        socket.emit("private message", sendingMessage);
        dispatch(setMessagesAction([...chatState.messages, sendingMessage]));
        setMessage("");
    }

    return (
        <div className='w-full h-full flex flex-col'>
            {/* receiver */}
            <div>
                {user && <ChatUser user={user} />}
            </div>
            {/* messages */}
            <div className='flex-grow'>
                <Message messages={chatState.messages} />
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
