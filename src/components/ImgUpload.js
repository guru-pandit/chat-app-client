import { useSelector, useDispatch } from "react-redux";

import { useRef, useState } from "react";
import { UploadIcon } from "@heroicons/react/outline";

const ImgUpload = () => {
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

    // Redux selector and dispatch
    const authState = useSelector((state) => state.auth);

    const [imageUrl, setImageUrl] = useState(authState.user?.Avatar);

    const handleImageUpload = e => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                // current.src = e.target.result;
                setImageUrl(e.target.result)
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center m-2">
            <div>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={imageUploader}
                    onChange={handleImageUpload}
                />
                <div className="w-32 h-32 rounded-full overflow-hidden cursor-pointer relative border-4 border-gray-500 profileUpload_container"
                    onClick={() => imageUploader.current.click()}
                >
                    <img
                        alt="Profile"
                        ref={uploadedImage}
                        src={imageUrl}
                        className="w-full h-full absolute left-0 top-0"
                    />
                    <div className="w-full h-full absolute flex items-center justify-center profileUpload__icon">
                        <UploadIcon className="w-12 h-12 text-gray-600" />
                    </div>
                </div>
            </div>
            <div>
                <button class="py-2 px-4 my-3 text-indigo-700 font-bold transition-colors duration-150 border border-indigo-500 rounded focus:shadow-outline hover:bg-indigo-50 hover:text-indigo-900 cursor-not-allowed opacity-50" disabled={true}>Save image</button>
            </div>
        </div >
    );
}

export default ImgUpload
