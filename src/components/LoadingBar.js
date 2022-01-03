import React, { useRef } from "react";
import LoadBar from "react-top-loading-bar";

export const LoadingBarContext = React.createContext();

const LoadingBar = ({ children }) => {
    // State
    const loadBarRef = useRef(null);

    return (
        <>
            <LoadBar color="#4338ca" height={4} ref={loadBarRef} />
            <LoadingBarContext.Provider value={loadBarRef}>
                {children}
            </LoadingBarContext.Provider>
        </>
    )
}

export default LoadingBar
