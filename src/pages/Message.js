import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "../services/axios";

const Message = () => {
    const authState = useSelector((state) => state.auth);
    const [messageArray, setMessageArray] = useState([]);
    const [message, setMessage] = useState("")
    const socket = useRef();

    useEffect(() => {
        socket.current = io("http://localhost:4000");
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
                body: msg.Body,
                senderID: msg.SenderID,
                senderName: "Guruprasad",
                receiverID: msg.ReceiverID,
                type: 'INCOMMING'
            }
            setMessageArray([...messageArray, receivedMessage]);
        })

        return () => socket.current.disconnect();
    }, [])

    // Send Message
    const sendMessage = () => {
        let msg = {
            body: message,
            senderID: authState.user.id,
            senderName: authState.user.Name,
            receiverID: 2,
            type: 'OUTGOING'
        }
        setMessageArray([...messageArray, msg]);

        socket.current.emit("message", { body: msg.body, senderID: msg.senderID, receiverID: msg.receiverID });
    }

    return (
        <div className="w-full h-full flex flex-col justify-end items-center">
            {
                messageArray.map((msg, i) => {
                    return (
                        <div className="w-full border border-red-500" key={i}>
                            <p className={msg.type === "OUTGOING" ? "text-right" : "text-left"}>{msg.senderName}</p>
                            <p className={msg.type === "OUTGOING" ? "text-right" : "text-left"}>{msg.body}</p>
                        </div>
                    )
                })
            }
            <div className="mb-3 pt-0 flex mx-6 w-full">
                <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Placeholder" className="px-3 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border shadow outline-none focus:outline-none focus:ring w-full" />
                <button onClick={sendMessage} className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Send</button>
            </div>
        </div>
    )
}

export default Message;
