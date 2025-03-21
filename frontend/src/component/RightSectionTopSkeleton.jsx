import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const RightSectionTopSkeleton = ({count}) => {
  return (
    <>
      <div className="right-section-topArea-img flex flex-row m-4 items-center">
          <Skeleton circle width={40} height={40}/>
          <Skeleton className="ml-2" width={40} height={10}/>
          <Skeleton circle className="ml-3" width={40} height={40}/>
          <Skeleton className="ml-2" width={40} height={10}/>
      </div>
      <div className="right-section-topArea-img flex flex-row">
      </div>
    </>
  )
}
