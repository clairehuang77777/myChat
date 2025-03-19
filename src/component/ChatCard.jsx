import { useContext,useState,useEffect } from "react";
import { SelectedIDContext } from "../SelectedIDContext";

export const ChatCard = ({chat}) => {
  //處理timestamp
  const timestamp = chat.timestamp; // Unix timestamp (毫秒)
  const date = new Date(timestamp);
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;

  const{ selectedID, setSelectedID} = useContext(SelectedIDContext)
  const [bgGrey, setBgGrey]=useState(false)
  
  console.log(chat)
  
  function handleChatCardClick(id){
    setSelectedID(id) //1
  }


  useEffect(()=>{
    setBgGrey(false)
    if(chat.id === selectedID){
      setBgGrey(true)}
  },[selectedID])

  return (
      <div className={bgGrey? "chat-card flex flex-row border-1 border-gray-300 items-start bg-[#f1f1f1]": "chat-card flex flex-row border-1 border-gray-300 items-start active:bg-[#f1f1f1] visited:bg-[#f1f1f1]"} onClick={()=>handleChatCardClick(chat.id)}>
        <div className="chat-card-left-area flex flex-row items-center justify-start ml-5 mt-7 mb-7">
          <img className="avatar-1-icon w-[40px] h-[40px] rounded-[45px]" src={chat.participants[0].avatar} alt="p1"></img>
          <img className="avatar-2-icon  w-[40px] h-[40px] rounded-[45px] ml-1" src={chat.participants[1].avatar} alt="p2"></img>
        </div>
      <div className="chat-card-center-area flex flex-col items-start ml-7 mt-5 w-[250px]">
        <div className="chat-username text-xl font-medium">{chat.participants[0].user} & {chat.participants[1].user}</div>
          <div className="last-msg text-m mt-1 mb-5 text-left">{chat.lastMessage}</div>
                </div>
          <div className="chat-card-right-area flex flex-row justify-end ml-5 mt-5">
          <div className="chat-date flex flex-row justify-end items-start ml-10 text-sm">{formattedDate}</div>
        </div>
      </div>
  )
}