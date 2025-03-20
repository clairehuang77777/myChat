import { useState, useContext, useRef } from "react"
import { SelectedIDContext } from '../SelectedIDContext'
import { postSystemMsg } from "../../../backend/api/api"

export const TextArea = () => {
  const {selectedID, newMsgUpdate, setNewMsgUpdate} = useContext(SelectedIDContext)
  const [inputValue, setInputValue]=useState('')
  const inputRef = useRef(null)

  //抓到input的值
  function handleOnchangeEvent(event){
    console.log(event.target.value)
    setInputValue(event.target.value)
  }

  //定義按下click時, 要把input的值視為參數傳給api
  async function handleSendClick(){
    //搜集參數
    console.log(inputValue)
    const updateId = selectedID
    const timestamp = Date.now();
    //把參數傳入
    try {
      const res = await postSystemMsg(inputValue, updateId, timestamp)
      console.log(res)

      if (res === 'success'){
        setNewMsgUpdate(true)
        inputRef.current.value =''
        }
    }
    catch(error){
      console.error(error)
    }

  }
  
console.log(newMsgUpdate)


  return (
    <>
      <textarea ref={inputRef} className="textarea mt-3 ml-3 pl-3 pt-3 h-[110px]" id="post" name="post" rows="3" cols="100" onChange={(event)=>handleOnchangeEvent(event)}>
      </textarea>
      <button className="post-btn rounded-md bg-[#ff6e06] text-white text-black h-[50px] w-[95px] mt-3 ml-5 dark:text-white dark:bg-[#5540d7]" type="button" onClick={()=>handleSendClick()}>Send</button>
    </>
  )
}
