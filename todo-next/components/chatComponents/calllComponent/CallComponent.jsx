"use client"
import "@/components/chatComponents/calllComponent/CallComponent.css"
import endCall from "@/public/images/phone-call-end.png"
import showVideo from "@/public/images/video.png"
import hideVideo from "@/public/images/no-video.png"
import { setCallActive } from "@/redux/slices/chatDataSlice"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { selcetUser } from "@/redux/slices/userSlice"
import fullScreen from "@/public/images/maximize.png"
import { socket } from "@/src/socket"


function CallComponent() {
  const dispatch=useDispatch();
  const [isVideo,setIsVideo]=useState(true);
  const hostVideoRef=useRef(null);
  const hostUser=useSelector(selcetUser);
  const friendVideoRef=useRef(null);
  const [largeMode,setLargeMode]=useState(false);

  const getHostVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video:true,audio:true})
      .then(stream => {
        console.log("host video 1",hostVideoRef);
        let video = hostVideoRef.current;
        video.srcObject = stream;
        console.log("host video 2",hostVideoRef);
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
        setTimeout(getHostVideo,4000)
      });
  };

  const getFriendVideo=()=>{

  }
  useEffect(() => {
    getHostVideo();
  }, [hostVideoRef]);

  useEffect(()=>{
     socket.on("callAccepted",()=>{
      console.log("call accepted")
     })
  },[])

  const handleEndCall=()=>{
    dispatch(setCallActive(false))
  }

  const handleToggleVideo=()=>{
    if(isVideo){
      setIsVideo(false);
      hostVideoRef.current.srcObject=null;
    }
    if(!isVideo){
      setIsVideo(true);
      getHostVideo();
    }
  }

  return (
    <div className="call-cont">
      <div className="call-section">
        <div className={`host-video-cont ${isVideo?"black-cont":""} ${largeMode==true?"large-video":"mini-video"}`}>
          {isVideo&&<div className="video-cont">
             <video ref={hostVideoRef}/>
             {largeMode==false&&<button className="large-btn" onClick={()=>{setLargeMode(true)}}>
                  <Image src={fullScreen} height={24} width={24} alt="full screen"/>            
              </button>}
           </div>}
           {!isVideo&&<div className="host-video-icon">{hostUser.name?hostUser.name[0]:""}</div>}
        </div>
        <div className={`friend-video-cont ${largeMode==false?"large-video":"mini-video"}`}>
           <div className="video-cont">
             <video ref={friendVideoRef}/>
             {largeMode==true&&<button className="large-btn" onClick={()=>{setLargeMode(false)}}>
                  <Image src={fullScreen} height={24} width={24} alt="full screen"/>            
              </button>}
           </div>
        </div>
        <div className="call-options">
            <button onClick={handleEndCall}>
              <Image src={endCall} height={32} width={32} alt="end"/>
            </button>
            <button onClick={handleToggleVideo}>
              {isVideo&&<Image src={showVideo} height={32} width={32} alt="hide"/>}
              {!isVideo&&<Image src={hideVideo} height={32} width={28} alt="show"/>}
            </button>
        </div>
      </div>
    </div>
  )
}

export default CallComponent
