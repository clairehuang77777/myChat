// import { LeftMsg } from './LeftMsg'
// import { RightMsg } from './RightMsg'
import { Msg } from './Msg'
import { useContext, useEffect, useState, useRef } from 'react'
import { SelectedIDContext } from '../SelectedIDContext'
import { MsgSkelton } from './MsgSkeleton'
import { RightSectionTopSkeleton } from './RightSectionTopSkeleton'

export const RightSectionCenter = ({chat}) => {
  const defaultMessage =[
    {
      "conversationId": 1,
      "userId": 4,
      "user": "David",
      "avatar": "https://i.pravatar.cc/150?img=4",
      "messageType": "text",
      "message": "Jest vs Cypress?",
      "reactions": {
        "like": 4,
        "love": 2,
        "laugh": 0
      },
      "timestamp": 1739016000000
    },
    {
      "conversationId": 1,
      "userId": 2,
      "user": "Bob",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "messageType": "text",
      "message": "Redux or Zustand?",
      "reactions": {
        "like": 5,
        "love": 3,
        "laugh": 0
      },
      "timestamp": 1739016060000
    },
    {
      "conversationId": 1,
      "userId": 2,
      "user": "Bob",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "messageType": "text",
      "message": "Jest vs Cypress?",
      "reactions": {
        "like": 0,
        "love": 0,
        "laugh": 0
      },
      "timestamp": 1739016120000
    },
    {
      "conversationId": 1,
      "userId": 4,
      "user": "David",
      "avatar": "https://i.pravatar.cc/150?img=4",
      "messageType": "text",
      "message": "How's it going?",
      "reactions": {
        "like": 4,
        "love": 1,
        "laugh": 1
      },
      "timestamp": 1739016180000
    },
    {
      "conversationId": 1,
      "userId": 2,
      "user": "Bob",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "messageType": "text",
      "message": "Any book recommendations for developers?",
      "reactions": {
        "like": 2,
        "love": 2,
        "laugh": 0
      },
      "timestamp": 1739016240000
    },
    {
      "conversationId": 1,
      "userId": 4,
      "user": "David",
      "avatar": "https://i.pravatar.cc/150?img=4",
      "messageType": "text",
      "message": "I'm building a new side project.",
      "reactions": {
        "like": 5,
        "love": 2,
        "laugh": 1
      },
      "timestamp": 1739016300000
    },
    {
      "conversationId": 1,
      "userId": 4,
      "user": "David",
      "avatar": "https://i.pravatar.cc/150?img=4",
      "messageType": "text",
      "message": "What's your favorite editor?",
      "reactions": {
        "like": 0,
        "love": 1,
        "laugh": 1
      },
      "timestamp": 1739016360000
    },
    {
      "conversationId": 1,
      "userId": 2,
      "user": "Bob",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "messageType": "text",
      "message": "What's your favorite editor?",
      "reactions": {
        "like": 0,
        "love": 0,
        "laugh": 1
      },
      "timestamp": 1739016420000
    },
    {
      "conversationId": 1,
      "userId": 4,
      "user": "David",
      "avatar": "https://i.pravatar.cc/150?img=4",
      "messageType": "text",
      "message": "I'm building a new side project.",
      "reactions": {
        "like": 0,
        "love": 0,
        "laugh": 2
      },
      "timestamp": 1739016480000
    },
    {
      "conversationId": 1,
      "userId": 2,
      "user": "Bob",
      "avatar": "https://i.pravatar.cc/150?img=2",
      "messageType": "text",
      "message": "React is amazing!",
      "reactions": {
        "like": 4,
        "love": 1,
        "laugh": 2
      },
      "timestamp": 1739016540000
    }
  ]
  const {user1, setUser1,user2, setUser2, newMsgUpdate, setNewMsgUpdate, isLoading} = useContext(SelectedIDContext)
  const [user1Name, setUser1Name] = useState('')
  const [user2Name, setUser2Name] = useState('')
  const [isNameLoading, setIsNameLoading]=useState(true)
  // const chatRef = useRef(null);

  const lastMsgRef = useRef(null); 

   // 每次 chat 改變就滑到最下面（滑動效果）
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

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
    setIsNameLoading(false)
  }
  },[chat])
  
  //  // 每次 messages 改變時就捲到底
  // useEffect(() => {
  //   if (chatRef.current) {
  //     chatRef.current.scrollTop = chatRef.current.scrollHeight;
  //   }
  // }, [chat]);

  console.log(newMsgUpdate)
  console.log("user1 是:",user1)
  console.log("user2 是:",user2)
  console.log("isLoading status",isLoading)

  const renderChat = chat.length > 0 ? chat : defaultMessage

  return (
    <>
    <div className="right-section-topArea h-[75px] w-[1022px] flex flex-row flex-grow border border-gray-300 inset-shadow-sm dark:border-stone-500">
      {isNameLoading ? (
      <RightSectionTopSkeleton/>
      ):(<>
            <div className="right-section-topArea-img flex flex-row m-4 items-center justify-center">
              <div className="right-section-topArea-img user-1 flex flex-row items-center justify-center pl-3">
                <img className="avatar-1-icon w-[40px] h-[40px] rounded-[45px]" src={`https://i.pravatar.cc/150?img=${user1}`} alt=""></img>
                <div className="right-section-topArea-userName text-lg pl-2">{user1Name}</div>
                <div className="right-section-topArea-userName-and text-lg pl-3"> &</div>
              </div>
              <div className="right-section-topArea-img user-2 flex flex-row items-center justify-center pl-3">
                <img className="avatar-2-icon  w-[40px] h-[40px] rounded-[45px]" src={`https://i.pravatar.cc/150?img=${user2}`} alt=""></img>
                <div className="right-section-topArea-userName text-xl pl-2">{user2Name}
                </div>
              </div>
            </div>
            <div className="right-section-topArea-img flex flex-row">
                {/* <div className="right-section-topArea-userName text-2xl mt-5">{user1Name} & {user2Name}
                </div> */}
            </div>
          </>
        )
      }
    </div>
    <div className="right-section-centerArea h-[650px] w-[1022px] flex-grow border-1 border-gray-300 block overflow-scroll inset-shadow-sm dark:border-stone-500">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) =><MsgSkelton key={index} count={1}/>)
      ) : (
      renderChat.map((msg, index) => {
        const isLast = index === renderChat.length - 1
        
        return (
        <div key={index} ref={isLast ? lastMsgRef : null}>
          <Msg msg={msg}/>
          </div>
        )
      }))
      }
    </div>
    </>
  )
}