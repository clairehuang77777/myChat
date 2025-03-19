import axios from 'axios'

export async function getAllConversation(){
  try {
    const res = await axios.get("http://localhost:3000/conversations")
    console.log(res.data)
    return res.data
  }
  catch(error){
    console.error("getAllConversation API failed",error)
  }
}


export async function getSingleCnvs(id){
  try {
    const res = await axios.get(`http://localhost:3000/message?conversationID=${id}`)
  return res.data
  }
  catch(error){
    console.error("getSingleCnvs API error", error)
  }
}