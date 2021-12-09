import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getUser } from "../services/chat"

const Conversation = ({ conversation, currentChat }) => {
    const [user, setUser] = useState(null);

    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("Conversation-user:- ", user)
    }, [user])
    // following method runs when conversation update
    useEffect(() => {
        const friendsID = conversation?.Members?.find((f) => f != authState.user.id);
        // console.log("FriendsID:- ", friendsID);

        getUser(friendsID).then((res) => {
            // console.log("GetUser-res:- ", res.data);
            setUser(res.data)
        }).catch((err) => {
            console.log("GetUser-err:- ", err);
        })
    }, [conversation])


    return (
        <>
            <div key={user?.id} className="flex items-center p-2 cursor-pointer hover:bg-gray-700" >
                <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full border border-gray-300" src={user?.Avatar} alt="" />
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user?.Name}
                        {/* <span className="h-2.5 w-2.5 p-.5 ml-1.5 inline-block border-4 border-green-500 rounded-full ">  </span> */}
                    </div>
                    <div className="text-sm font-normal leading-none text-gray-400 mt-1.5">{user?.Phone}</div>
                </div>
            </div>
        </>
    )
}

export default Conversation;
