"use client"
import { Provider} from "react-redux"
import store from "@/redux/store"

import axios from "axios";
import { useEffect } from "react";


function StoreProvider({children}) {
  useEffect(()=>{
    console.log("called")
  },[])
  return (
    <>
    <Provider store={store} >
     {children}
     </Provider>
    </>
  )
}

export default StoreProvider
