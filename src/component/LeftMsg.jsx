import { useState } from "react"
import { Reaction } from "../component/Reaction"

export const LeftMsg = ({msg}) => {
  const [useImage, setUseImage] = useState(false)

  if (msg.messageType==="image"){
    setUseImage(true)
  }

  //處理timestamp
  const timestamp = msg.timestamp; // Unix timestamp (毫秒)
  const date = new Date(timestamp);
  const formattedDate = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div className="left-msg flex flex-row mt-1 mb-1">
     <div className="left-msg-leftImgArea flex flex-row items-start p-3">
        <div className="left-msg-nameArea flex flex-col">
        <img className="left-msg-nameArea-img w-[40px] h-[40px] rounded-[45px]" src={msg.avatar} alt=""></img>
        <p className="left-msg-nameArea-name text-sm">{msg.user}</p>  
        </div>
      </div>
      <div className="left-msg-rightTextArea flex flex-col pt-3">
        <div className="left-msg-rightTextArea-top flex flex-row">
        <div className="left-msg-rightTextArea-top-text w-fit ml-2 max-w-sm bg-[#f9f9f9] p-3 rounded-lg text-lg text-left">{useImage ? (<img src={msg.message}></img>):(<p>{msg.message}</p>)}</div>
        <div className="left-msg-rightTextArea-top-time text-xs pl-2 items-end justify-end flex flex-rows">{formattedDate}</div>
      </div>
      <div className="left-msg-rightTextArea-reaction flex flex-row">
        <Reaction number={msg.reactions}/>
      </div>
      </div>
    </div>
  )
}