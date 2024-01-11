"use client"
import Image from "next/image"
import "@/components/Navbar/Navbar.css"
import userIcon from "@/public/images/user.png"
import logo from "@/public/images/task.png"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const router =useRouter();
    return (
        <div className="Navbar">
            <div className="nav">
                <div className="logo-cont">
                    <Image src={logo} className="logo" alt="logo"/>
                </div>
                <div className="text-logo">
                    <h1>Todo-App</h1>
                </div>
                <button className="user-info-btn">
                    <Image src={userIcon} className="user-icon" alt="user" onClick={()=>{
                       localStorage.removeItem("todo-token")
                       router.push("/auth/login")
                    }}/>
                </button>
            </div>
            <div className="user-info">

            </div>
        </div>
    )
}
