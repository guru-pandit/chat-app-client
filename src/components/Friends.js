import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

import { setCurrentChatAction } from './../actions/chat.action';
import { classNames } from './../helpers/commonHelper';

const Friends = () => {
    // Redux selector and dispatch
    const authState = useSelector((state => state.auth));
    const chatState = useSelector((state => state.chat));
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("Friends:- ", authState.friends);
    }, [])

    return (
        <>
            {
                authState.friends?.map((f) => (
                    <div key={f.id} onClick={() => dispatch(setCurrentChatAction(f))}>
                        <div
                            className={classNames(
                                chatState.currentChat?.id == f.id ? 'bg-gray-700' : '',
                                'flex items-center p-2 cursor-pointer hover:bg-gray-700'
                            )}
                        >
                            <div className="flex-shrink-0">
                                <img className="h-12 w-12 rounded-full" src={f.Avatar} alt={f.Name} />
                            </div>
                            <div className="w-full flex flex-col ml-3">
                                <div
                                    className="flex justify-between">
                                    <span className='text-base font-medium leading-none text-white'>{f.Name}</span>
                                    <span className='bg-green-600 text-white w-5 h-5 text-center leading-5 rounded-full' style={{ "fontSize": ".6rem" }}>{"0"}</span>
                                </div>
                                <div
                                    className="mt-1.5 flex items-center justify-between">
                                    <span className='text-sm font-normal leading-none text-gray-400'>{f.LastMessage[0].Body}</span>
                                    <span className='text-gray-400' style={{ "fontSize": ".6rem" }}>{moment.utc(f.LastMessage[0].MessageSentAt).fromNow()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default Friends
