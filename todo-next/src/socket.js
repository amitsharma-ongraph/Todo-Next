import io from "socket.io-client";

export const EndPoint="http://localhost:5000" 

export const socket=io(EndPoint,{
    autoConnect:false
});