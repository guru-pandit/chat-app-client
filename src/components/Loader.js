import LoaderSpinner from "react-loader-spinner";

const Loader = () => {
    return (
        <>
            <div className='w-full h-full flex items-center justify-center top-0 left-0 bg-black bg-opacity-40  absolute'>
                <LoaderSpinner
                    type="Puff" color="#3730A3" height={80} width={80}
                />
            </div>
        </>
    )
}

export default Loader
