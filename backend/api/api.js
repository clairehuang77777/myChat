import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || process.env.API_URL
console.log(import.meta.env.VITE_API_URL)

export async function getAllConversation(){
  try {
    const res = await axios.get(`${API_URL}/conversations`)
    console.log(res.data)
    return res.data
  }
  catch(error){
    console.error("getAllConversation API failed",error)
  }
}


export async function getSingleCnvs(id){
  try {
    const res = await axios.get(`${API_URL}/message?conversationID=${id}`)
  return res.data
  }
  catch(error){
    console.error("getSingleCnvs API error", error)
  }
}