"use client"
import "@/components/chatComponents/calllComponent/CallComponent.css"
import endCall from "@/public/images/phone-call-end.png"
import showVideo from "@/public/images/video.png"
import Image from "next/image"
function CallComponent() {
  return (
    <div className="call-cont">
      <div className="call-section">
        <div className="call-options">
            <button>
              <Image src={endCall} height={32} width={32} alt="end"/>
            </button>
            <button>
              <Image src={showVideo} height={32} width={32} alt="hide"/>
            </button>
        </div>
      </div>
    </div>
  )
}

export default CallComponent
