'use client'
import "@/app/auth/auth.css"
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { updateUserId } from "@/redux/slices/userSlice";

function Register() {
  const router=useRouter();
  const dispatch=useDispatch();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [emailError,setEmailError]=useState("");
  const [passwordError,setPasswordError]=useState("");
  const [cnfError,setcnfError]=useState("");
  const [nameError,setNameError]=useState("");


  const handleRegister=async()=>{
    try {
      const res=await axios.post("http://localhost:5000/api/auth/register",{email,password,confirmPassword:confirm,name})
      console.log(res.data)
      router.push("/home");
      dispatch(updateUserId(res.data.user._id))
    } catch (error) {
      console.log(error.response.data)
      if (error.response.data.field === "email") {
        setEmailError(error.response.data.message);
      } else if (error.response.data.field === "password") {
        setPasswordError(error.response.data.message);
      } else if(error.response.data.filed==="confirmPassword"){
        setcnfError(error.response.data.message)
      } else if(error.response.data.field==="name"){
        setNameError(error.response.data.message)
      }
    }
  }
  return (
    <>
      <h3>Register</h3>
      <form className="register form" onSubmit={e=>{e.preventDefault(),handleRegister()}}>
        <input type="text" className={clsx("text-input", {
            error: nameError != "",
          })}
         placeholder="Name" onChange={e=>{setName(e.target.value);setNameError("")}} />
        <input type="text" className={clsx("text-input", {
            error: emailError != "",
          })}
         placeholder="Email" onChange={e=>{setEmail(e.target.value);setEmailError("")}}></input>
        <input
          type="password"
          className={clsx("text-input", {
            error: passwordError != "",
          })}
          placeholder="Password"
          onChange={e=>{setPassword(e.target.value);setPasswordError("")}}
        ></input>
        <input
          type="password"
          className={clsx("text-input", {
            error: cnfError != "",
          })}
          placeholder="Confirm Password"
          onChange={(e=>{setConfirm(e.target.value);setcnfError("")})}
        ></input>
        <input type="submit" className="submit"></input>
      </form>
      <div className="nav-btn-cont">
        <p>Already an user ?</p>
        <button
          className="nav-btn"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          <Image src="/next.png" height={25} width={25} className="next-logo" alt="logo" />
        </button>
      </div>
    </>
  );
}

export default Register;