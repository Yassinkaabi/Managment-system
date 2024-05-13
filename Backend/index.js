const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = 3001

const cors = require('cors')
app.use(cors('https://localhost:3000'));
app.use(express.json());


app.use('/', require('./Routes/productRoute'))
app.use('/api/v1/auth', require('./Routes/userRoute'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


