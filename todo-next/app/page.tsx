"use client"
import axios from "axios";
import Loading from "@/components/Loading/Loading"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLogin } from "@/helpers/helpers";

export default function App() {
  const router=useRouter();
  useEffect(()=>{
    redirect();
  })
  const redirect = async()=>{
    const login = await isLogin();
    if(login){
      setTimeout(()=>{
      router.push("/home")
      },1500)
    }
    else{
      setTimeout(()=>{
        router.push("/auth/login")
      },1500)
    }
  }
  return (
   <>
    <Loading />
   </>
  )
}
