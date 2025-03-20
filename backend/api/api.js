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

export async function postSystemMsg(inputValue, updateId, timestamp){
  try {
    const res = await axios.post(`${API_URL}/conversations/${updateId}/messages/create`,{
      inputValue,
      updateId,
      timestamp
    });
    console.log(res.data.message)
    return res.data.message
  }
catch(error){
    console.error("postSystemMsg Error", error)
  } 
}