require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')

const productsRouter = require('./routes/products')



const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

app.use(express.json())

//routes
app.get('/', (req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Products route</a>')
})

app.use('/api/v1/products', productsRouter)
// app.use('/api/v1/cheking', productsRouter)



app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 80

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server running on port:${port}`))
    }catch(error){
    console.log(error);
    }
}
start()