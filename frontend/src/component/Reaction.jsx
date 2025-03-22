import { useState, useContext } from "react"
import { updateLikeNum, updateLoveNum, updateLaughNum } from "../../../backend/api/api"
import { SelectedIDContext } from '../SelectedIDContext'


export const Reaction = ({number = {}, msgContent, msgUser, msgTimestamp}) => {
  const { isLike, setIsLike, isLove, setIsLove,isLaugh, setIsLaugh,setIsLoading,isLoading } = useContext(SelectedIDContext)
  
  async function handleThumbsUpClick(numberLike){
    console.log("thumbs up click",numberLike)
    const newLike = numberLike + 1
    console.log("new like", newLike)

    console.log("thumbs up 點擊的內容文字為:",msgContent)
    console.log("thumbs up 點擊的發文使用者為:",msgUser)
    console.log("thumbs up 點擊的發文的時間為:",msgTimestamp)
    
    //把新的數字傳給api
    try {
      const res = await updateLikeNum(newLike,msgContent,msgUser,msgTimestamp)
      console.log(res)
      if (res === "like_sccuess"){
        setIsLike(true)
        console.log(isLike)
      }
    }catch(error){
      console.error(error)
    }    
  }

  async function handleLoveClick(numberLove){
    console.log("love click", numberLove)
    const newLove = numberLove + 1
    console.log("new love", newLove)

    console.log("love 點擊的內容文字為:",msgContent)
    console.log("love 點擊的發文使用者為:",msgUser)
    console.log("love 點擊的發文的時間為:",msgTimestamp)

    //把新的數字傳給api
    try {
      const res = await updateLoveNum(newLove,msgContent,msgUser,msgTimestamp)
      console.log(res)
      if (res === "love_sccuess"){
        setIsLove(true)
      }
    }catch(error){
      console.error(error)
    }    
  }

  async function handleLaughClick(numberLaugh){
    console.log("Laugh click", numberLaugh)
    const newLaugh = numberLaugh + 1
    console.log("new Laugh", newLaugh)

    console.log("Laugh 點擊的內容文字為:",msgContent)
    console.log("Laugh 點擊的發文使用者為:",msgUser)
    console.log("Laugh 點擊的發文的時間為:",msgTimestamp)

    //把新的數字傳給api
    try {
      const res = await updateLaughNum(newLaugh,msgContent,msgUser,msgTimestamp)
      console.log(res)
      if (res === "laugh_sccuess"){
        setIsLaugh(true)
      }
    }catch(error){
      console.error(error)
    }    

  }

  return (
    <div className="reaction-area flex flex-rows mt-1">
      <div className="thumbs-up-area rounded-xl border-1 border-gray-300 flex flex-rows m-1 pl-2 pr-2 items-center dark:border-stone-500 cursor-pointer" onClick={()=>handleThumbsUpClick(number.like)}>
        <img className="thumbs-up-icon w-[15px] h-[15px]" src="/like.png"></img>
        <p className="thumbs-up-text w-[15px] pl-2">{number.like ||0}</p>
      </div>
      <div className="love-area rounded-xl border-1 border-gray-300 flex flex-rows m-1 pl-2 pr-2 items-center dark:border-stone-500 cursor-pointer" onClick={()=>handleLoveClick(number.love)}>
        <img className="love-icon w-[15px] h-[15px]" src="/love.png"></img>
        <p className="love-text  w-[15px] pl-2">{number.love ||0}</p>
      </div>
      <div className="laugh-area rounded-xl border-1 border-gray-300 flex flex-rows m-1 pl-2 pr-2 items-center dark:border-stone-500 cursor-pointer" onClick={()=>handleLaughClick(number.laugh)}>
        <img className="laugh-icon w-[15px] h-[15px]" src="/laugh.png"></img>
        <p className="laugh-text  w-[15px] pl-2">{number.laugh ||0}</p>
      </div>
    </div>
  )
}
