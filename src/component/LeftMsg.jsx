import { useState } from "react"
import { Reaction } from "./Reaction"

export const LeftMsg = () => {
  const [useImage, setUseImage] = useState(false)

  // if (messages.messageType==="image"){
  //   setUseImage(true)
  // }
  //messages.messageType="text"
  //messages.messageType="image"
  return (
    <div className="left-msg flex flex-row mt-1 mb-1">
     <div className="left-msg-leftImgArea flex flex-row items-start p-3">
        <div className="left-msg-nameArea flex flex-col">
        <img className="left-msg-nameArea-img w-[40px] h-[40px] rounded-[45px]" src="/a.jpeg" alt=""></img>
        <p className="left-msg-nameArea-name text-sm">David</p>  
        </div>
      </div>
      <div className="left-msg-rightTextArea flex flex-col pt-3">
        <div className="left-msg-rightTextArea-top flex flex-row">
        <div className="left-msg-rightTextArea-top-text w-fit ml-2 max-w-sm bg-[#f9f9f9] p-3 rounded-lg text-lg text-left">{useImage ? (<img src="/image.jpg"></img>):(<p>今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩</p>)}</div>
        <div className="left-msg-rightTextArea-top-time text-xs pl-2 items-end justify-end flex flex-rows">16:34</div>
      </div>
      <div className="left-msg-rightTextArea-reaction flex flex-row">
        <Reaction/>
      </div>
      </div>
    </div>
  )
}