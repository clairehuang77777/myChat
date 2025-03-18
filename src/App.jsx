import './App.css'
import { ChatCard } from './component/ChatCard'
import { LeftSectionTop } from './component/LeftSectionTop'
import { RightSectionTop } from './component/RightSectionTop'
import { TextArea } from './component/TextArea'
import { LeftMsg } from './component/LeftMsg'
import { RightMsg } from './component/RightMsg'

function App() {

  return (
    <div className="container flex flex-row fixed top-[0px] left-[0px]w-full">
        <div className="left-section w-[518px] flex flex-col">
          <div className="left-section-topArea h-[75px] flex flex-row">
            <LeftSectionTop/>
          </div>
          <div className="left-section-buttonArea w-[518px] h-lvh flex flex-col block overflow-scroll">
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/>
            <ChatCard/> 
          </div>
        </div>
        <div className="right-section w-[1603px]">
          <div className="right-section-topArea h-[75px] flex flex-row border-1 border-gray-300">
            <RightSectionTop/>
          </div>
          <div className="right-section-centerArea h-[650px] border-1 border-gray-300 block overflow-scroll">
          <LeftMsg/>
          <RightMsg/>
          <LeftMsg/>
          <LeftMsg/>
          <LeftMsg/>
          </div>
          <div className="right-section-buttonArea h-[160px] flex flex-row border-1 border-gray-300 block">
            <TextArea/>
          </div>
        </div>
      </div>
  )
}

export default App
