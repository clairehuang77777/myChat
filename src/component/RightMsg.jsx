import { useState } from "react"
import { Reaction } from "./Reaction"

export const RightMsg = ({msg}) => {
  const [useImage, setUseImage] = useState(false)

  if (msg.messageType==="image"){
    setUseImage(true)
  }

  //處理timestamp
  const timestamp = msg.timestamp; // Unix timestamp (毫秒)
  const date = new Date(timestamp);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;


  return (
    <div className="right-msg flex flex-row-reverse mt-1 mb-1 justify-start">
     <div className="right-msg-rightImgArea flex flex-row items-start p-3">
        <div className="right-msg-nameArea flex flex-col">
        <img className="right-msg-nameArea-img w-[40px] h-[40px] rounded-[45px]" src={msg.avatar}  alt=""></img>
        <p className="right-msg-nameArea-name text-sm">{msg.user}</p>  
        </div>
      </div>
      <div className="right-msg-rightTextArea flex flex-col pt-3">
        <div className="right-msg-rightTextArea-top flex flex-row-reverse">
        <div className="right-msg-rightTextArea-top-text w-fit ml-2 max-w-sm bg-[#f9f9f9] p-3 rounded-lg text-lg text-right">{useImage ? (<img src={msg.message}></img>):(<p>{msg.message}</p>)}</div>
        <div className="left-msg-rightTextArea-top-time text-xs pl-2 items-end justify-end flex flex-rows">{formattedDate}</div>
      </div>
      <div className="right-msg-rightTextArea-reaction flex flex-row-reverse">
        <Reaction number={msg.reactions}/>
      </div>
      </div>
    </div>
  )
}