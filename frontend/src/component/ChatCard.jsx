import { useContext,useState,useEffect } from "react";
import { SelectedIDContext } from "../SelectedIDContext";

export const ChatCard = ({chat}) => {
  //處理timestamp
  const timestamp = Number(chat.timestamp); // Unix timestamp (毫秒)
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
      <div className={bgGrey? 
      "chat-card flex flex-row border-1 border-gray-300 items-start bg-[#f1f1f1] dark:border-stone-500 dark:bg-[#4a4a4b]": "chat-card flex flex-row border-1 border-gray-300 items-start  dark:border-stone-500"} onClick={()=>handleChatCardClick(chat.id)}>
        <div className="chat-card-left-area flex flex-row items-center justify-start ml-5 mt-7 mb-7">
        </div>
        <div className="chat-card-center-area flex flex-col items-start ml-7 mt-5 w-[350px] mb-5 items-center">
          <div className="chat-usernames-and-pics flex flex-row text-xl font-medium items-center justify-center">
            <div className="chat-username-and-pic flex flex-col text-xl font-medium items-center justify-center">
              <img className="chat-pic-1-icon w-[40px] h-[40px] rounded-[45px]" src={chat.participants[0].avatar} alt="p1"></img>
              <div className="chat-username-text-1 text-xs font-medium">{chat.participants[0].user}</div>
            </div>
            <div className="chat-username-and-pic flex flex-col text-xl font-medium pl-2 items-center ml-1">
              <img className="chat-pic-2-icon w-[40px] h-[40px] rounded-[45px]" src={chat.participants[1].avatar} alt="p1"></img>
              <div className="chat-username-text-2 text-xs font-medium">{chat.participants[1].user}</div>
            </div>
          </div>
          <div className="last-msg text-m mt-3 text-left text-stone-500 dark:text-white">{chat.lastMessage}</div>
        </div>
        <div className="chat-card-right-area flex flex-row justify-end ml-1 mt-5">
          <div className="chat-date flex flex-row justify-end items-start ml-1 text-sm">
            {formattedDate}</div>
        </div>
      </div>
  )
}