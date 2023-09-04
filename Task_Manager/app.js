
const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')

app.use(express.static('./public'))
app.use(express.json())

// app.get('/hello', (req, res)=>{
//     res.send('Task_Manager')
// })

app.use('/api/v1/tasks', tasks)

app.use(notFound)

const port = process.env.PORT || 80
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server running on port:${port}`))

    } catch (error) {
        console.log(error);
    }
}
start()
