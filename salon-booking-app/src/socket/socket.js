import { io } from 'socket.io-client';

const SOCKET_URL = 'http://13.61.4.12:3000'; // Replace with your backend server URL
const socket = io(SOCKET_URL);

socket.on('connect',()=>{
    console.log('connected id'+socket.id)
})

export default socket;