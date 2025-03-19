export const Reaction = ({number = {}}) => {
  return (
    <div className="reaction-area flex flex-rows mt-1">
      <div className="thumbs-up-area rounded-xl border-1 border-gray-300 flex flex-rows m-1 pl-2 pr-2 items-center">
        <img className="thumbs-up-icon w-[15px] h-[15px]" src="/like.png"></img>
        <p className="thumbs-up-text w-[15px] pl-2">{number.like ||0}</p>
      </div>
      <div className="love-area rounded-xl border-1 border-gray-300 flex flex-rows m-1 pl-2 pr-2 items-center">
        <img className="love-icon w-[15px] h-[15px]" src="/love.png"></img>
        <p className="love-text  w-[15px] pl-2">{number.love ||0}</p>
      </div>
      <div className="laugh-area rounded-xl border-1 border-gray-300 flex flex-rows m-1 pl-2 pr-2 items-center">
        <img className="laugh-icon w-[15px] h-[15px]" src="/laugh.png"></img>
        <p className="laugh-text  w-[15px] pl-2">{number.laugh ||0}</p>
      </div>
    </div>
  )
}
