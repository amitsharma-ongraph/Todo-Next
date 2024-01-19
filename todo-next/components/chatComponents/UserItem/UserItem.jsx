import "@/components/chatComponents/UserItem/UserItem.css"
import { selectReceiverId, updateReceiver } from "@/redux/slices/chatDataSlice"
import { useDispatch, useSelector } from "react-redux"

function UserItem({user}) {
  const receiverId=useSelector(selectReceiverId);
  const dispatch=useDispatch();
  const handleConvoSwitch=()=>{
    dispatch(updateReceiver(user._id))
  }
  return (
    <div className={`user-item ${user._id==receiverId?"active-convo":""}`} onClick={handleConvoSwitch}>
      <div className="flex align-center justify-center convo-log-cont">
        <div className="convo-logo">{user.name[0].toLowerCase()}</div>
      </div>
      <div className="user-name">{user.name}</div>
    </div>
  )
}

export default UserItem
