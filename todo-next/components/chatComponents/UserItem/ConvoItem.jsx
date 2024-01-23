import "@/components/chatComponents/UserItem/ConvoItem.css";
import {
  selectActiveConvo,
  selectActiveUsers,
  selectSenderId,
  updateActiveConvo,
} from "@/redux/slices/chatDataSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import multipleUsers from "@/public/images/users.png";

function ConvoItem({ convo }) {
  const activeConvo = useSelector(selectActiveConvo);
  const activeUsers = useSelector(selectActiveUsers);
  const senderId=useSelector(selectSenderId);

  const isActive = () => {
  
     return convo.users.some(user=>{
      if(user._id!=senderId&&activeUsers.includes(user._id)){
        return true;
      }
      else{
        return false;
      }
     })
  }
  const dispatch = useDispatch();
  const handleConvoSwitch = () => {
    dispatch(updateActiveConvo(convo));
  };
  return (
    <div
      className={`user-item ${
        convo._id == activeConvo._id ? "active-convo" : ""
      } ${isActive() == true ? "online" : ""}`}
      onClick={handleConvoSwitch}
    >
      <div className="flex align-center justify-center convo-log-cont">
        <div className="convo-logo">
          {!convo.isGroupChat && convo.chatName[0].toLowerCase()}
          {convo.isGroupChat && (
            <Image src={multipleUsers} height={16} width={16} alt="G"/>
          )}
        </div>
      </div>
      <div className="convo-data">
        <div className="user-name">{convo.chatName}</div>
        <div className="last-msg">last received message</div>
      </div>
    </div>
  );
}

export default ConvoItem;
