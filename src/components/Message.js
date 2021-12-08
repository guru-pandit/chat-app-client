import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ messages }) => {
    // ref to the dummy div
    const messageEndRef = useRef();

    // make chat box always scroll down
    useEffect(() => {
        messageEndRef.current.scrollIntoView()
    }, [messages])

    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth)

    return (
        <>
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
        </>
    )
}

export default Message;
