import "@/components/chatComponents/messageItem/MessageItem.css";

function MessageItem({ message, modId, senderId }) {
  
  const getInitial = () => {
    return message.senderId.name ? message.senderId.name[0] : "";
  };
  const isMod = () => {
    return message.senderId._id == modId;
  };
  const getTime=()=>{
    let date=new Date(message.createdAt)
    let formateDate=date.getHours()+":"+date.getMinutes();
    return formateDate
  }
  const getDate=()=>{
    let today=new Date().toLocaleDateString();
    console.log("today",today);
    let date=new Date(message.createdAt).toLocaleDateString();
    return date==today?"today":date;
  }
  return (
    <div className="message-item-cont">
      {message.showDate&&<div className="date-stamp-cont">
         <div className="line-cont"><div className="line"></div></div>
         <div className="date-stamp">{getDate()}</div>
         <div className="line-cont"><div className="line"></div></div>
      </div>}

      {!isMod() && (
        <div className={`message-item ${senderId==message.senderId._id?"right":"left"}`}>
          <div className="message-avatar-cont">
            {message.position == "top" && senderId!=message.senderId._id&&(
              <div className="message-avatar">{getInitial()}</div>
            )}
          </div>
          <div className="content-cont">
             {message.position=="top"&&<p className="time">{message.senderId.name.split(" ")[0]+", "+getTime()}</p>}
             <p className={`message-content ${message.position=="top"?"top-content":"middle-content"}`}>{message.content}</p>
          </div>
        </div>
      )}
      {isMod()&&(
        <div className="mod-message-item center">{message.content}</div>     
      )
      }
    </div>
  );
}

export default MessageItem;
