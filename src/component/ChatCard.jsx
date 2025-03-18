export const ChatCard = () => {
  return (
      <div className="chat-card flex flex-row border-1 border-gray-300">
        <div className="chat-card-left-area flex flex-row items-center justify-start ml-5 mt-7 mb-7">
          <img className="avatar-1-icon w-[60px] h-[60px] rounded-[45px]" src="/a.jpeg" alt=""></img>
          <img className="avatar-2-icon  w-[60px] h-[60px] rounded-[45px] ml-2" src="/b.jpeg" alt=""></img>
        </div>
      <div className="chat-card-center-area flex flex-col items-start ml-7 mt-7">
        <div className="chat-username text-xl">David & Bob</div>
          <div className="last-msg text-m mt-1">I’m building a new side project.</div>
                </div>
          <div className="chat-card-right-area flex flex-row justify-end ml-5 mt-7">
          <div className="chat-date flex flex-row justify-end items-start ml-10">2/7</div>
        </div>
      </div>
  )
}