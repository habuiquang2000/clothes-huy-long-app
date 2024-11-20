import { io } from "socket.io-client";

// Platform => URL
// Web browser => localhost
// iOS simulator => localhost
// Android simulator => 10.0.2.2
// Real device => the IP of your machine (provided that you are on the same network)


const socket = io("http://localhost:4000");

export default socket;
