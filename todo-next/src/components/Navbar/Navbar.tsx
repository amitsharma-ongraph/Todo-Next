import Image from "next/image"
import "@/src/components/Navbar/Navbar.css"
import userIcon from "@/public/user.png"
import logo from "@/public/task.png"

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="nav">
                <div className="logo-cont">
                    <Image src={logo} className="logo" alt="logo"/>
                </div>
                <div className="text-logo">
                    <h2>Todo-App</h2>
                </div>
                <div className="user-info-btn">
                    <Image src={userIcon} className="user-icon" alt="user"/>
                </div>
            </div>
            <div className="user-info">

            </div>
        </div>
    )
}
