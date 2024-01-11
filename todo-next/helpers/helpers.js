import axios from "axios";

export const isLogin = async ()=>{
    const token =localStorage.getItem('todo-token');
    axios.defaults.headers["authorization"]=token;
    try {
        const res=await axios.get("http://localhost:5000/api/auth/verify");
        if(res.data.success==true){
          return true;
        }
    } catch (error) {
      return false;
    }
}