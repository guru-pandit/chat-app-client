import { CheckCircleIcon, EyeIcon } from "@heroicons/react/outline";

const MsgStatus = ({ message }) => {
    return (
        <>
            {
                message.IsRead ? (
                    <EyeIcon className="h-4 w-4 text-indigo-900" />
                ) : (
                    < CheckCircleIcon className="h-4 w-4" />
                )
            }
        </>
    )
}

export default MsgStatus;
