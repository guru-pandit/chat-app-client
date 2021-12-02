import { io } from "socket.io-client";

let URL = process.env.SERVER || "http://localhost:4000"
const socket = io(URL, { autoConnect: false });

export default socket;