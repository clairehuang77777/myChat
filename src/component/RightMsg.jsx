import { useState } from "react"
import { Reaction } from "./Reaction"

export const RightMsg = () => {
  const [useImage, setUseImage] = useState(false)

  // if (messages.messageType==="image"){
  //   setUseImage(true)
  // }
  //messages.messageType="text"
  //messages.messageType="image"
  return (
    <div className="right-msg flex flex-row-reverse mt-1 mb-1 justify-start">
     <div className="right-msg-rightImgArea flex flex-row items-start p-3">
        <div className="right-msg-nameArea flex flex-col">
        <img className="right-msg-nameArea-img w-[40px] h-[40px] rounded-[45px]" src="/b.jpeg" alt=""></img>
        <p className="right-msg-nameArea-name text-sm">Bob</p>  
        </div>
      </div>
      <div className="right-msg-rightTextArea flex flex-col pt-3">
        <div className="right-msg-rightTextArea-top flex flex-row-reverse">
        <div className="right-msg-rightTextArea-top-text w-fit ml-2 max-w-sm bg-[#f9f9f9] p-3 rounded-lg text-lg text-right">{useImage ? (<img src="/image.jpg"></img>):(<p>今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩今天本來要去哪裡玩</p>)}</div>
        <div className="right-msg-rightTextArea-top-time text-xs pl-2 items-end justify-start flex flex-rows">16:34</div>
      </div>
      <div className="right-msg-rightTextArea-reaction flex flex-row-reverse">
        <Reaction/>
      </div>
      </div>
    </div>
  )
}