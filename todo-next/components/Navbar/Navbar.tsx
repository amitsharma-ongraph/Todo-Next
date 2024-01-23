"use client"
import Image from "next/image"
import "@/components/Navbar/Navbar.css"
import userIcon from "@/public/images/user.png"
import chatLogo from "@/public/images/chat.png"
import logo from "@/public/images/task.png"
import { usePathname, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { updateToken } from "@/redux/slices/userSlice"

export default function Navbar() {
    const router =useRouter();
    const pathname=usePathname();
    const dispatch=useDispatch();
    return (
        <div className={`Navbar ${pathname.includes("socket")?"nav-light":""}`}>
            <div className="nav">
                <div className="logo-cont">
                    <Image src={logo} className="logo" alt="logo" onClick={e=>{router.push("/todo")}}/>
                    <Image src={chatLogo} className="chat-logo" alt="chat" onClick={e=>{router.push("/chat")}}/>
                </div>
                <div className="text-logo"> 
                    <h1>{pathname.split("/")[1]}-app</h1>
                </div>
                <button className="user-info-btn">
                    <Image src={userIcon} className="user-icon" alt="user" onClick={()=>{
                       localStorage.removeItem("todo-token")
                       dispatch(updateToken(""))
                       router.push("/auth/login")
                    }}/>
                </button>
            </div>
            <div className="user-info">

            </div>
        </div>
    )
}
