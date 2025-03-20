
import express from 'express'
//從node.js引入path 跟fs模組
import dotenv from 'dotenv'

import fs from "fs"
import path from "path"
import cors from "cors"
/* ES module中需要自己定義__dirname*/
import { fileURLToPath} from "url"
import { dirname } from "path"

dotenv.config({path : `.env.${process.env.NODE_ENV}`})
console.log("透過terminal指令載入環境變數",process.env.NODE_ENV)
console.log("透過讀取env file去讀取API URL",process.env.API_URL)


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


//定義api
app.get('/conversations', (req, res) => {
  res.send(chatData.conversations)
})

//定義api
app.get(`/message`, (req, res) => {
  const {conversationID} = req.query
  const cnvtID = Number(conversationID)

  const messages = chatData.messages
  const selectedMsg = messages.filter(message=>message.conversationId == cnvtID)
  console.log(selectedMsg)
  res.send(selectedMsg)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})