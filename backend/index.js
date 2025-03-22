
import express from 'express'
//從node.js引入path 跟fs模組
import dotenv from 'dotenv'

import fs from "fs"
import path from "path"
import cors from "cors"
/* ES module中需要自己定義__dirname*/
import { fileURLToPath} from "url"
import { dirname } from "path"
// 載入pg模組
import pkg from 'pg'
const { Pool } = pkg

dotenv.config({path : `.env.${process.env.NODE_ENV}`})
console.log("透過terminal指令載入環境變數",process.env.NODE_ENV)
console.log("透過讀取env file去讀取API URL",process.env.API_URL)

// 建立PostgreSQL的連線池
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
})

// 確認連線成功
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL')
    client.release()
  })
  .catch(err => console.error('PostgreSQL connection error', err))

const app = express()
const port = 3000

//cors設定
const allowCors = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: (origin, callback) => {
        const allowedOrigins = [
          'https://mychat-b570.onrender.com' // 本地開發環境
        ];
        console.log("CORS request from:", origin); // 記錄請求來源

        if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
          callback(null, true);
        } else {
          callback(new Error(`Not allowed by CORS,${origin}`));
        }
      },
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    };
  } else {
    return {
      origin: 'http://localhost:5173', // 本地開發
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    };
  }
};

//建立middleware
app.use(cors(allowCors())); //處理跨域
const corsOptions = allowCors()
console.log("CORS 設定:", corsOptions); // 記錄 CORS 設定，方便 debug
app.use(express.json()); //解析json格式的req


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//自己import讓__dirname可以運作
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//讀取chat_data.json
const chatDataPath = path.join(__dirname, "chat_data.json")
const chatData = JSON.parse(fs.readFileSync(chatDataPath,"utf-8"))
//console.log(chatData.messages)



//定義api[---原本連接本地端json檔案---]
// app.get('/conversations', (req, res) => {
//   res.send(chatData.conversations)
// })

//定義api[---改成連db---]
app.get('/conversations', async (req, res) => {
  try {
    const conversationResult = await pool.query('SELECT * FROM conversation')
    const participantResult = await pool.query('SELECT * FROM participant')
    
    // console.log(conversationResult)
    // console.log(participantResult)

    const conversations = conversationResult.rows.map(conv => {
      const participants = participantResult.rows
      .filter(parti => parti.conversation_id === conv.id)
        .map(parti =>({
          userId: parti.userid,
          user:parti.user,
          avatar:parti.avatar
        }))

      return {
        id:conv.id,
        lastMessage:conv.lastmessage,
        timestamp:conv.timestamp,
        participants
      }
    })

    // console.log(conversations)
    res.json({conversations})

  } catch (err) {
    console.error('查詢失敗', err)
    res.status(500).send('DB 查詢失敗')
  }
})


//定義api[---改成連db---]
app.get(`/message`, async (req, res) => {
  //從api.js拉下req conversation
  const {conversationID} = req.query
  const cnvtID = Number(conversationID)
  
  try {
  const messageResult = await pool.query('SELECT * FROM message')
    const reactionResult = await pool.query('SELECT * FROM reaction')
    
  const messages = messageResult.rows.map(msg => {
      const reactions = reactionResult.rows.find(r => r.message_id === msg.message_id)

      return {
        conversationId:msg.conversationid,
        userId:msg.userid,
        user:msg.username,
        avatar:msg.avatar,
        messageType:msg.messagetype,
        message:msg.message,
        timestamp:msg.timestamp,
        reactions: reactions ? {
          like: reactions.like,
          love: reactions.love,
          laugh: reactions.laugh
          } : { like: 0, love: 0, laugh: 0 }
        }
    })
      
  const selectedMsg = messages.filter(message=>message.conversationId == cnvtID)
  console.log(selectedMsg)
  res.send(selectedMsg)

  } catch (err) {
    console.error('查詢失敗', err)
    res.status(500).send('DB 查詢失敗')
  }
})

//定義api[---原本連接本地端json檔案---]
// // app.get(`/message`, (req, res) => {
//   const {conversationID} = req.query
//   const cnvtID = Number(conversationID)

//   const messages = chatData.messages
//   const selectedMsg = messages.filter(message=>message.conversationId == cnvtID)
//   console.log(selectedMsg)
//   res.send(selectedMsg)
// })

//定義api[---原本連接本地端json檔案---]

// app.post('/conversations/:id/messages/create',(req , res) =>{
//   console.log(req.body)//{ inputValue: 'this is good' }
//   console.log(req.params) //{ id: '1' }

//   const newConversationId = req.params.id
//   const newMessage = req.body.inputValue
//   const timestamp = req.body.timestamp

//   // 確保 conversationId 是數字
//   const conversationId = parseInt(newConversationId, 10);
//   if (isNaN(conversationId)) {
//     return res.status(400).json({ error: "Invalid conversation ID" });
//   }

//   const newSystemMessage = {
//      "conversationId": conversationId,
//       "userId": null,
//       "user": null,
//       "avatar": null,
//       "messageType": "system",
//       "message": `System message: ${newMessage}`,
//       "reactions": {
//         "like": 0,
//         "love": 0,
//         "laugh": 0
//       },
//       "timestamp": timestamp
//   }
//   console.log("updated message", newSystemMessage)
//   console.log(chatData.messages)
//   chatData.messages.push(newSystemMessage)
  
//   //把檔案寫進去local chat_json file
//   fs.writeFileSync(chatDataPath,JSON.stringify(chatData,null,2),"utf-8" )

//   res.status(201).json({ message: "success", data: chatData.messages });
// })

//定義api[---改成連db---]
app.post('/conversations/:id/messages/create', async(req , res) =>{
  console.log(req.body)//{ inputValue: 'this is good' }
  console.log(req.params) //{ id: '1' }

  const newConversationId = req.params.id
  const newMessage = req.body.inputValue
  const timestamp = req.body.timestamp

  // 確保 conversationId 是數字
  const conversationId = parseInt(newConversationId, 10);
  if (isNaN(conversationId)) {
    return res.status(400).json({ error: "Invalid conversation ID" });
  }

  const client = await pool.connect()

  try {
    // 1. 插入 message 表
    const insertMessageResult = await client.query(`
      INSERT INTO message (conversationid, userid, username, avatar, messagetype, message, timestamp)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING message_id
    `, [conversationId, '0', 'system', null, 'system', `System message: ${newMessage}`, timestamp])

    const messageId = insertMessageResult.rows[0].message_id

    // 2. 插入 reaction 表
    await client.query(`
      INSERT INTO reaction (message_id, "like", "love", "laugh")
      VALUES ($1, 0, 0, 0)
    `, [messageId])

    res.status(201).json({ message: "success", message_id: messageId })

  } catch (error) {
    console.error("新增訊息失敗", error)
    res.status(500).json({ error: "新增訊息失敗" })
  } finally {
    client.release()
  }
})

//定義api[---原本連接本地端json檔案---]
// app.post('/conversations/like',(req , res) =>{
//   //先從req上載下資料
//   console.log(req.body.newLike)
//   console.log(req.body.msgContent)
//   const newLikeNum = req.body.newLike
//   const finderContent = req.body.msgContent
//   const finderUser =req.body.msgUser
//   const finderTimestamp = req.body.msgTimestamp

//   //取得原始完整資料
//   console.log(chatData.messages)
//   const allMessages = chatData.messages

//   //從message中找到對的那一筆
//   const findMsg = allMessages.find((msg)=>msg.message === finderContent && msg.user === finderUser && msg.timestamp === finderTimestamp)
//   console.log(findMsg)
//   //更新數字
//   findMsg.reactions.like = newLikeNum
//   //重印完整資料
//   console.log(chatData.messages)
//   res.status(201).json({message:"like_sccuess",data: chatData.messages})
// })

//定義api[---改成連db---]
app.post('/conversations/like',async(req , res) =>{
  //先從req上載下資料
  console.log(req.body.newLike)
  console.log(req.body.msgContent)
  const newLikeNum = req.body.newLike
  const finderContent = req.body.msgContent
  const finderUser =req.body.msgUser
  const finderTimestamp = req.body.msgTimestamp

  const client = await pool.connect();

  //取得原始完整資料
  try {
    const messageResult = await pool.query('SELECT * FROM message')
    const reactionResult = await pool.query('SELECT * FROM reaction')
    
  const messages = messageResult.rows.map(msg => {
      const reactions = reactionResult.rows
      .find(reaction => reaction.message_id === msg.message_id) || {
        like:0, love: 0,laugh: 0 } 

      return {
        message_id:msg.message_id,
        conversationId:msg.conversationid,
        userId:msg.userid,
        user:msg.username,
        avatar:msg.avatar,
        messageType:msg.messagetype,
        message:msg.message,
        timestamp:msg.timestamp,
        reactions: {
          like: reactions.like, 
          love: reactions.love,
          laugh: reactions.laugh
        }
      }
    })
      
  console.log(messages)
  //從message中找到對的那一筆
  const findMsg = messages.find(
    (msg)=>
      msg.message === finderContent && 
      msg.user === finderUser && 
      msg.timestamp === finderTimestamp
    )

  console.log(findMsg)

  if (!findMsg) {
      return res.status(404).json({ error: "訊息找不到" });
    }
  
  //找到對應那筆的msg_id
  const messageId  = findMsg.message_id

  //去更新那筆msg_id的reaction table
  await client.query(`
      UPDATE reaction
      SET "like" = $1
      WHERE message_id = $2
    `, [newLikeNum, messageId]);

    res.status(201).json({ message: "like_sccuess"})

  } catch (err) {
    console.error('查詢失敗', err)
    res.status(500).send('DB 更新失敗')
  } finally {
    client.release()
  }
})

app.post('/conversations/love',(req , res) =>{
  //先從req上載下資料
  console.log(req.body.newLove)
  console.log(req.body.msgContent)
  const newLoveNum = req.body.newLove
  const finderContent = req.body.msgContent
  const finderUser =req.body.msgUser
  const finderTimestamp = req.body.msgTimestamp

  //取得原始完整資料
  console.log(chatData.messages)
  const allMessages = chatData.messages

  //從message中找到對的那一筆
  const findMsg = allMessages.find((msg)=>msg.message === finderContent && msg.user === finderUser && msg.timestamp === finderTimestamp)
  console.log(findMsg)
  //更新數字
  findMsg.reactions.love = newLoveNum
  //重印完整資料
  console.log(chatData.messages)
  res.status(201).json({message:"love_sccuess",data: chatData.messages})
})

app.post('/conversations/laugh',(req , res) =>{
  //先從req上載下資料
  console.log(req.body.newLaugh)
  console.log(req.body.msgContent)
  const newLaughNum = req.body.newLaugh
  const finderContent = req.body.msgContent
  const finderUser =req.body.msgUser
  const finderTimestamp = req.body.msgTimestamp

  //取得原始完整資料
  console.log(chatData.messages)
  const allMessages = chatData.messages

  //從message中找到對的那一筆
  const findMsg = allMessages.find((msg)=>msg.message === finderContent && msg.user === finderUser && msg.timestamp === finderTimestamp)
  console.log(findMsg)
  //更新數字
  findMsg.reactions.laugh = newLaughNum
  //重印完整資料
  console.log(chatData.messages)
  res.status(201).json({message:"laugh_sccuess",data: chatData.messages})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})