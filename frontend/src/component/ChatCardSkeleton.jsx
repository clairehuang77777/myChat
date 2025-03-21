import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ChatCardSkelton = ({count}) => {
  return(
    <>
     <div className="chat-card flex flex-row border-1 border-gray-300 items-start  dark:border-stone-500">
        <div className="chat-card-left-area flex flex-row items-center justify-start ml-5 mt-7 mb-7">
        </div>
        <div className="chat-card-center-area flex flex-col items-start ml-7 mt-5 w-[350px] mb-5 items-center">
          <div className="chat-usernames-and-pics flex flex-row text-xl font-medium items-center justify-center">
            <div className="chat-username-and-pic flex flex-col text-xl font-medium items-center justify-center">
              <Skeleton circle width={40} height={40}/>
              <Skeleton width={40} height={10}/>
            </div>
            <div className="chat-username-and-pic flex flex-col text-xl font-medium pl-2 items-center ml-1">
              <Skeleton circle width={40} height={40}/>
              <Skeleton width={40} height={10}/>
            </div>
          </div>
          <div className="last-msg text-m mt-3 text-left text-stone-500">
            <Skeleton  width={180} height={20}/>
          </div>
        </div>
      </div>
    </>
    )
  }
