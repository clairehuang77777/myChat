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
  const[selectedID, setSelectedID]=useState(1)
  const[singleChat, setSingleChat]=useState([])
  const [user1, setUser1]=useState(4)
  const [user2, setUser2]=useState(2)
  const [leftmsg , setLeftMsg] = useState([])
  const [rightmsg , setRightMsg] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    // 偵測系統是否為 Dark Mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // 設定事件監聽器，當系統主題變更時更新狀態
    const handleChange = (e) => setIsDarkMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);

    // 清除監聽器，避免 memory leak
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  console.log(isDarkMode)

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
    <SelectedIDContext.Provider value={{selectedID, setSelectedID, user1, setUser1,user2, setUser2, singleChat, setSingleChat, leftmsg, setLeftMsg, rightmsg, setRightMsg, isDarkMode, setIsDarkMode }}>
      <div className="container flex flex-row fixed top-[0px] left-[45px] inset-0 h-screen overflow-hidden bg-white text-black dark:bg-[#2B2B2B] dark:text-stone-200 dark:border-stone-500">
          <div className="left-section w-[518px] flex flex-col dark:border-stone-500">
            <div className="left-section-topArea h-[75px] flex flex-row border border-gray-300 dark:border-stone-500">
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
            <div className="right-section-buttonArea h-[160px] flex flex-row border border-gray-300 block dark:border-stone-500">
              <TextArea/>
            </div>
          </div>
      </div>
    </SelectedIDContext.Provider>
  )
}

export default App
