import { useState } from "react";
import { PaperAirplaneIcon, DotsVerticalIcon } from "@heroicons/react/solid";

const ChatSection = () => {
    const [message, setMessage] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("onSubmitHandler clicked");
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
                        <div className="text-base font-semibold leading-none text-gray-900">Guru</div>
                        <div className="text-sm font-normal leading-none text-gray-600 mt-1.5">7776088638</div>
                    </div>
                    <div className="mx-4 cursor-pointer">
                        <DotsVerticalIcon className="h-5 w-5 text-lg text-gray-600" />
                    </div>
                </div>
            </div>
            {/* messages */}
            <div className='flex-grow border-2 border-blue-700'></div>
            {/* message send */}
            <div className=''>
                <form className="bg-white px-5" onSubmit={onSubmitHandler}>
                    <div className="flex items-center py-2">
                        <input
                            className="shadow-sm bg-gray-100 appearance-none border border-gray-300 rounded-full w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='message'
                            id="message"
                            type="text"
                            placeholder="Message"
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
