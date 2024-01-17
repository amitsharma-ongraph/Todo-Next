"use client"
import { useGetAllQuery } from "@/redux/api/apiSlice"
import { selectToken, selectUserId } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";


function page() {
    const token=useSelector(selectToken);
    const userId=useSelector(selectUserId);
    console.log(token)
    const {data,error}=useGetAllQuery({
      token,
      userId
    });
    console.log(data)
    console.log(error)
  return (
    <div>
      RTK tests
    </div>
  )
}

export default page
