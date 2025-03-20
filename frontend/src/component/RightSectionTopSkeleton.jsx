import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const RightSectionTopSkeleton = ({count}) => {
  return (
    <>
      <div className="right-section-topArea-img flex flex-row m-4">
          <Skeleton circle width={40} height={40}/>
          <Skeleton circle className="ml-3" width={40} height={40}/>
      </div>
      <div className="right-section-topArea-img flex flex-row">
          <div className="right-section-topArea-userName text-2xl mt-5">
            <Skeleton className="skeleton" width={80} height={30}/>
          </div>
      </div>
    </>
  )
}
