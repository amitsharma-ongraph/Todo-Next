"use client";

import "@/app/auth/auth.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, updateToken, updateUser, updateUserId } from "@/redux/slices/userSlice";

function LoginPage() {
  const router = useRouter();
  const [load,setLoad]=useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch=useDispatch();

  const handleLogin = async () => {
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.data.success === true) {
        console.log(res.data)
        localStorage.setItem("todo-token", res.data.token);
        localStorage.setItem("todo-userId",res.data.user._id);
        localStorage.setItem("todo-user",JSON.stringify(res.data.user))
        dispatch(updateToken(res.data.token))
        dispatch(updateUser(res.data.user))
        dispatch(updateUserId(res.data.user._id));
        router.push("/todo");
      } 
    } catch (error) {
      console.log(error)
      if (error.response?.data?.field === "email") {
        setEmailError(error.response.data.message);
      } else if (error.response?.data?.field === "password") {
        setPasswordError(error.response.data.message);
      }
    }
  };

  if(setLoad==false){
    return (<></>)
  }
  return (
    <>
      <h3>Login</h3>
      <form
        className="login form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="text"
          className={clsx("text-input", {
            error: emailError != "",
          })}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmailError("");
            setEmail(e.target.value);
          }}
        ></input>

        <input
          type="password"
          className={clsx("text-input", {
            error: passwordError != "",
          })}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPasswordError("");
            setPassword(e.target.value);
          }}
        ></input>

        <input type="submit" className="submit"></input>
      </form>
      <div className="nav-btn-cont">
        <p>New user ?</p>
        <button
          className="nav-btn"
          onClick={() => {
            router.push("/auth/register");
          }}
        >
          <Image
            src="/next.png"
            height={25}
            width={25}
            className="next-logo"
            alt="Login"
          ></Image>
        </button>
      </div>
    </>
  );
}

export default LoginPage;
