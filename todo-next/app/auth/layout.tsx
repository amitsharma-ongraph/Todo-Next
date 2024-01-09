import userLogo from "@/public/user.png"
import Image from "next/image"

const authLayout=({ children,
}: {
    children: React.ReactNode
}
) =>{

    return (
        <div className='auth-cont'>
            <div className="auth-card">
                <div className="user-logo">
                    <Image src={userLogo} alt="user" />
                </div>
                {children}
            </div>
        </div>
    )
}
export default authLayout