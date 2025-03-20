import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ChatCardSkelton = ({count}) => {
  return(
    <>
      <div className="chat-card flex flex-row border-1 border-gray-300 items-start  dark:border-stone-500">
        <div className="chat-card-left-area flex flex-row items-center justify-start ml-5 mt-7 mb-7">
          <Skeleton circle width={40} height={40}/>
          <Skeleton className="ml-2" circle width={40} height={40}/>
        </div>
      <div className="chat-card-center-area flex flex-col items-start ml-7 mt-5 w-[250px]">
          <div className="chat-username text-xl font-medium">
            <Skeleton  width={100} height={25}/>
          </div>
          <div className="last-msg text-m mt-1 mb-5 text-left">
            <Skeleton  width={180} height={20}/>
          </div>
      </div>
          <div className="chat-card-right-area flex flex-row justify-end ml-5 mt-5">
          <div className="chat-date flex flex-row justify-end items-start ml-10 text-sm">
            <Skeleton  width={20} height={20}/>
          </div>
        </div>
      </div>
    </>
    )
  }
