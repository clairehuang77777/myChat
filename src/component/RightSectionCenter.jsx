// import { LeftMsg } from './LeftMsg'
// import { RightMsg } from './RightMsg'
import { Msg } from './Msg'
import { useContext, useEffect, useState } from 'react'
import { SelectedIDContext } from '../SelectedIDContext'

export const RightSectionCenter = ({chat}) => {
  const {user1, setUser1,user2, setUser2, leftmsg, setLeftMsg, rightmsg, setRightMsg} = useContext(SelectedIDContext)
  const [user1Name, setUser1Name] = useState('')
  const [user2Name, setUser2Name] = useState('')

  useEffect(()=>{
    //定義user1, user2 是誰
  if(chat.length > 0){
    //如果chat有值，先把第一個留言userID存成user 1
    console.log(chat[0].userId)
    const getUser1 = chat[0].userId
    setUser1(chat[0].userId) //left user
    setUser1Name(chat[0].user)
    //找到第二個user2, 只要不是user1(David) 的,那就存成user2 
    const selecteduser2 = chat.find((msg)=>msg.userId !== getUser1)
    console.log(selecteduser2)
    setUser2(selecteduser2.userId) //right user
    setUser2Name(selecteduser2.user)

  }
  },[chat])
  
  
  console.log("user1 是:",user1)
  console.log("user2 是:",user2)


  return (
    <>
    <div className="right-section-topArea h-[75px] flex flex-row flex-grow border border-gray-300 inset-shadow-sm">
        <div className="right-section-topArea-img flex flex-row m-4">
          <img className="avatar-1-icon w-[40px] h-[40px] rounded-[45px]" src={`https://i.pravatar.cc/150?img=${user1}`} alt=""></img>
          <img className="avatar-2-icon  w-[40px] h-[40px] rounded-[45px] ml-2" src={`https://i.pravatar.cc/150?img=${user2}`} alt=""></img>
      </div>
      <div className="right-section-topArea-img flex flex-row">
          <div className="right-section-topArea-userName text-2xl mt-5">{user1Name} & {user2Name}
          </div>
      </div>
    </div>
    <div className="right-section-centerArea h-[650px] flex-grow border-1 border-gray-300 block overflow-scroll inset-shadow-sm">
      {chat.map((msg, index) => (<Msg key={index} msg={msg}/>))}
    </div>
    </>
  )
}