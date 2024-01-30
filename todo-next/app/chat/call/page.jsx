"use client"

import "@/app/chat/call/Call.css"
import { useEffect, useRef } from "react"

function CallPage() {
  const videoRef = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video:true,audio:true})
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      <video ref={videoRef}/>
    </div>
  )
}

export default CallPage
