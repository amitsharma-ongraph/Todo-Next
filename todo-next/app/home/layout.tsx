"use client"
import Navbar from "@/components/Navbar/Navbar"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {isLogin} from "@/helpers/helpers"

const HomeLayout=({ children,
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
        setLoad(true)
       }
       else{
        router.push("/auth/login")
       }
      }
    return (
        <>
        {load==true&&
        <div className='Home'>
           <Navbar/>

           {children}
        </div>
        }
        </>
    )
}
export default HomeLayout