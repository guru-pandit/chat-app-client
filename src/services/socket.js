import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { setConnection } from "./chat";

let URL = process.env.SERVER || "http://localhost:4000"
const socket = io(URL, { autoConnect: false });

// export function connectToSocket() {
// Connect to the socket
// socket.connect();

// on connect listener
// socket.on("connect", () => {
//     console.log("Connected:- ", socket.id);
//     setConnection(authState.user?.id, socket.id).then((response) => {
//         // console.log("Connected-Response:- ", response.data);
//         dispatch(connectionSuccessAction())
//     }).catch((err) => {
//         console.log("Connected-Response-err", err);
//         dispatch(connectionFailAction());
//     })
// });
// }

// export function disconnectFromSocket() {
//     // disconnect from the socket
//     socket.disconnect();
// }



export default socket;