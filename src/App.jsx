import { RightSectionTop } from '../src/component/RightSectionTop'
import { TextArea } from '../src/component/TextArea'
import { ChatCard } from './component/ChatCard'
import { LeftSectionTop } from './component/LeftSectionTop'
import { RightSectionCenter } from './component/RightSectionCenter'
import { getAllConversation, getSingleCnvs } from '../backend/api/api'
import { useEffect, useState } from 'react'
import { SelectedIDContext } from './SelectedIDContext'

function App() {
  const[allConversations, setAllConversations]=useState([])
  const[selectedID, setSelectedID]=useState(null)
  const[singleChat, setSingleChat]=useState([])
  const [user1, setUser1]=useState('')
  const [user2, setUser2]=useState('')
  const [leftmsg , setLeftMsg] = useState([])
  const [rightmsg , setRightMsg] = useState([])

  useEffect(()=>{
    async function fetchAllConverstion(){
    try {
      const conversations = await getAllConversation()
      console.log(conversations)
      setAllConversations(conversations)
    } catch(error){
      console.log(error)
    }
  }
  
  fetchAllConverstion()
  },[selectedID])

  console.log(selectedID)
  //
  useEffect(()=>{
    async function getSigleUserChat(selectedID){
      try {
        const res = await getSingleCnvs(selectedID)
        console.log(res)
        setSingleChat(res)
      }catch(error){
        console.error("getSingleUserChat error", error)
      }
    }

    getSigleUserChat(selectedID)
    
  },[selectedID])
  

  return (
    <SelectedIDContext.Provider value={{selectedID, setSelectedID, user1, setUser1,user2, setUser2, singleChat, setSingleChat, leftmsg, setLeftMsg, rightmsg, setRightMsg }}>
    <div className="container flex flex-row fixed top-[0px] left-[45px] inset-0 h-screen overflow-hidden bg-white text-black">
        <div className="left-section w-[518px] flex flex-col">
          <div className="left-section-topArea h-[75px] flex flex-row border border-gray-300">
            <LeftSectionTop/>
          </div>
          <div className="left-section-buttonArea w-[518px] flex-grow flex flex-col overflow-scroll inset-shadow-sm">
            {allConversations.map((chat, index)=>(
              <ChatCard key={index} chat={chat}/> 
            ))}

          </div>
        </div>
        <div className="right-section flex flex-col flex-grow w-full">
          <RightSectionCenter chat={singleChat}/>
          <div className="right-section-buttonArea h-[160px] flex flex-row border border-gray-300 block">
            <TextArea/>
          </div>
        </div>
    </div>
    </SelectedIDContext.Provider>
  )
}

export default App
