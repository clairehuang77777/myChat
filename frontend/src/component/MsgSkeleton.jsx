import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const MsgSkelton = ({count}) => {
  return(
    <>
      <div className="left-msg flex flex-row mt-1 mb-1">
        <div className="left-msg-leftImgArea flex flex-row items-start p-3">
          <div className="left-msg-nameArea flex flex-col">
            <Skeleton circle width={40} height={40}/>
          </div>
        </div>
        <div className="left-msg-rightTextArea flex flex-col pt-3">
            <div className="left-msg-rightTextArea-top flex flex-row">
            <Skeleton className="skeleton" width={440} height={40}/>
          </div>
        </div>
      </div>
    </>
    )
  }
