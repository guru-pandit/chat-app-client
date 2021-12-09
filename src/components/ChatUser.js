import moment from "moment";
import { DotsVerticalIcon } from "@heroicons/react/solid";

const ChatUser = ({ user }) => {
    return (
        <>
            <div className="flex items-center p-2 bg-gray-200">
                <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full border border-gray-500" src={user?.Avatar} alt="" />
                </div>
                <div className="flex-grow ml-3">
                    <div className="text-base font-semibold leading-none text-gray-900">{user?.Name}
                        {
                            user?.ConnectionDetail.IsConnected ? (
                                <span className="h-2.5 w-2.5 p-.5 ml-1.5 inline-block border-4 border-green-500 rounded-full">  </span>
                            ) : (
                                <span className="p-px ml-3 inline-block text-xs text-gray-500 font-medium">{moment.utc(user?.ConnectionDetail.DisconnectedAt).fromNow()}</span>
                            )
                        }
                    </div>
                    <div className="text-sm font-normal leading-none text-gray-600 mt-1.5">{user?.Phone}</div>
                </div>
                <div className="mx-4 cursor-pointer">
                    <DotsVerticalIcon className="h-5 w-5 text-lg text-gray-600" />
                </div>
            </div>
        </>
    )
}

export default ChatUser;
