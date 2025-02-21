const express = require('express')
const server = express()
const PORT = 4321
const path = require('path')
const cors = require('cors')
const api = require('./static/routes/routes')
//base functions
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

//API Calls
server.use(cors())
server.use(express.json())
server.use('/api/v1/users', api)



server.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
})
