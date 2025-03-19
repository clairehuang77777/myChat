import { useContext} from 'react'
import { SelectedIDContext } from '../SelectedIDContext'

export const LeftSectionTop = () => {
  const {isDarkMode} = useContext(SelectedIDContext)

  return (
      <>
        <div className="topArea-menu">
          <img className="menu-icon w-[40px] h-[40px] m-4" src={isDarkMode ? "/menu-white.png" : "/menu.png"} alt=""></img>
        </div>
        <div className="topArea-text mt-4 text-3xl">chat management</div>
      </>
  )
}