"use client"
import { isLogin } from "@/helpers/helpers"
import userLogo from "@/public/images/user.png"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const authLayout=({ children,
}: {
    children: React.ReactNode
}
) =>{
    const [load,setLoad]=useState(false);
    const router=useRouter();
    useEffect(()=>{
        redirect();
      })
      const redirect = async()=>{
       const login=await isLogin();
       if(login){
        router.push("/home")
       }
       else{
        setLoad(true)
       }
      }
    return (
        <>
        {load==true&&
        <div className='auth-cont'>
            <div className="auth-card">
                <div className="user-logo">
                    <Image src={userLogo} alt="user" />
                </div>
                {children}
            </div>
        </div>
       }
       </>
    )
}
export default authLayout