// import { LeftMsg } from './LeftMsg'
// import { RightMsg } from './RightMsg'
import { Msg } from './Msg'
import { useContext, useEffect } from 'react'
import { SelectedIDContext } from '../SelectedIDContext'

export const RightSectionCenter = ({chat}) => {
  const {user1, setUser1,user2, setUser2, leftmsg, setLeftMsg, rightmsg, setRightMsg} = useContext(SelectedIDContext)

  useEffect(()=>{
    //定義user1, user2 是誰
  if(chat.length > 0){
    //如果chat有值，先把第一個留言userID存成user 1
    console.log(chat[0].user)
    const getUser1 = chat[0].user
    setUser1(chat[0].user) //left user
    //找到第二個user2, 只要不是user1(David) 的,那就存成user2 
    const selecteduser2 = chat.find((msg)=>msg.user !== getUser1)
    console.log(selecteduser2)
    setUser2(selecteduser2.user) //right user

  }
  },[chat])
  
  // useEffect(()=>{
  // if(chat.length > 0){
  //     //user1會走left Msg, user2走Right Msg
  //     const leftMsgArr = chat.filter((msg)=>msg.user === user1)
  //     setLeftMsg(leftMsgArr)

  //     const rightMsgArr = chat.filter((msg)=>msg.user === user2)
  //     console.log(rightMsgArr)
  //     setRightMsg(rightMsgArr)
  //   }
  // },[chat,user1,user2])
  
  console.log("user1 是:",user1)
  console.log("user2 是:",user2)


  return (
    <div className="right-section-centerArea h-[650px] border-1 border-gray-300 block overflow-scroll">
      {/* {leftmsg.map((msg, index)=> (<LeftMsg key={index} msg={msg}/>))}
      {rightmsg.map((msg, index)=> (<RightMsg key={index} msg={msg}/>))} */}
      {chat.map((msg, index) => (<Msg key={index} msg={msg}/>))}
    </div>
  )
}