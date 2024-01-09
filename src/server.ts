import express from 'express'
import itemRoutes from "./routes/item-routes";
import {connectToMongoDB} from "./configs/mongodb";
import dotenv from 'dotenv'
import path from "path";
dotenv.config()

const PORT = 9000
const app = express()
let server: any

// json serialize
app.use(express.json())

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res)=> {
    // res.status(200).json({message: 'Hello World!'})
    res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.use('/api/v1/items', itemRoutes)

// Start the express app
connectToMongoDB(process.env.MONGODB_URI as string).then(()=> {
    console.log('✅ Mongodb Connected!')
    server = app.listen(PORT, ()=> {
        console.log(`🚀 Server is running on port ${PORT}`)
    })
}).catch((ex)=> {
    console.log('🔴 Connection failed with MongoDB!', ex)
})

export {app,server}

