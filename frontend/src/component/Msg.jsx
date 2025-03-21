import { useState, useContext, useEffect } from "react"
import { Reaction } from "../component/Reaction"
import { SelectedIDContext } from '../SelectedIDContext'

export const Msg = ({msg}) => {
  const { user2} = useContext(SelectedIDContext)
  const [useImage, setUseImage] = useState(false)
  const [rightSideOn, setRightSideOn] = useState(false)
  const [isSystemMsg, setIsSystemMsg] = useState(false)

  //處理當msg.user = user2時, rightsideon

  console.log("當前的user2是",user2)
  console.log("當前的msg.user是",msg.userId)

  useEffect(()=>{
      if (msg.userId === user2 || msg.userId === 2){
        setRightSideOn(true)
      } else {
        setRightSideOn(false)
      }
  },[msg.userId, user2])
  
  useEffect(()=>{
    if (msg.messageType==="image"){
      setUseImage(true)
    } else {
      setUseImage(false)
    }
  },[msg.messageType])

   useEffect(()=>{
      if(msg.messageType==="system"){
        setIsSystemMsg(true)
      } else {
        setIsSystemMsg(false)
      }
  },[msg.messageType])


  useEffect(()=>{
    console.log("rideSideOn 更新值的變換", rightSideOn)
  },[rightSideOn])


  //處理timestamp
  const timestamp = msg.timestamp; // Unix timestamp (毫秒)
  const date = new Date(timestamp);
  const formattedDate = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;

  return  ( 
      <div className={isSystemMsg ?
            "right-msg flex flex-row-reverse mt-1 mb-1 justify-center" :
            rightSideOn ?
              "right-msg flex flex-row-reverse mt-1 mb-1 pr-10 justify-start" :"left-msg flex flex-row mt-1 mb-1 pl-5"}>
          <div className={isSystemMsg ? "left-msg-leftImgArea flex flex-row items-start p-3 hidden":"left-msg-leftImgArea flex flex-row items-start p-3"}>
              <div className="left-msg-nameArea flex flex-col">
                <img className="left-msg-nameArea-img w-[40px] h-[40px] rounded-[45px]" src={msg.avatar} alt=""></img>
                <p className="left-msg-nameArea-name text-sm">{msg.user}</p>  
              </div>
            </div>
            <div className="left-msg-rightTextArea flex flex-col pt-3">
              <div className={rightSideOn ? "right-msg-rightTextArea-top flex flex-row-reverse": "left-msg-rightTextArea-top flex flex-row"}>
                <div className={isSystemMsg ?
                "right-msg-rightTextArea-top-text w-fit ml-2 max-w-lg bg-[#9e9e9e] p-3 rounded-lg text-lg text-center text-white dark:bg-[#424242]":
                rightSideOn ? 
                "right-msg-rightTextArea-top-text w-fit ml-2 max-w-sm bg-[#f9f9f9] p-3 rounded-lg text-lg text-right dark:bg-[#424242]" : "left-msg-rightTextArea-top-text w-fit ml-2 max-w-sm bg-[#f9f9f9] p-3 rounded-lg text-lg text-left dark:bg-[#424242]"}>
                  {useImage ? (<img src={msg.message}></img>):(<p>{msg.message}</p>)}
                </div>
                <div className="left-msg-rightTextArea-top-time text-xs pl-2 items-end justify-end flex flex-rows">{formattedDate}
                </div>
              </div>
              <div className={rightSideOn? "right-msg-rightTextArea-reaction flex flex-row-reverse" : "left-msg-rightTextArea-reaction flex flex-row"}>
                <Reaction number={msg.reactions} msgContent={msg.message} msgUser={msg.user} msgTimestamp={msg.timestamp}/>
              </div>
            </div>
      </div>
      )
  }