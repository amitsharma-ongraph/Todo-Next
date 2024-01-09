"use client";

import "@/app/auth/auth.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.data.success === true) {
        localStorage.setItem("todo-token", res.data.token);
        router.push("/home");
      }
    } catch (error) {
      if (error.response.data.field === "email") {
        setEmailError(error.response.data.message);
      } else if (error.response.data.field === "password") {
        setPasswordError(error.response.data.message);
      }
    }
  };

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
