'use client'
import "@/app/auth/auth.css"
import Image from "next/image";
import { useRouter } from "next/navigation";

function Register() {
  const router=useRouter();
  return (
    <>
      <h3>Register</h3>
      <form className="register form">
        <input type="text" className="text-input" placeholder="Name" />
        <input type="text" className="text-input" placeholder="Email"></input>
        <input
          type="password"
          className="text-input"
          placeholder="Password"
        ></input>
        <input
          type="password"
          className="text-input"
          placeholder="Confirm Password"
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