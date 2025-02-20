//API CALLS 
const db = require('../database/db')
const express = require('express')
const routes = express.Router()


routes.get('/getAllUsers', async (req, res) => {
    const results = await db.getAllUsers()
    console.log('results:', results);
    res.status(200).json(await db.getAllUsers())
})

routes.post('/insertUser', async (req, res) => {
    try {
        console.log(req.body);
        const data = {
            username : req.body.username,
            password : req.body.password,
            desc : req.body.desc
        }
        const results = await db.insertUser(data)
        console.log(results)
    } catch (error) {
        console.log(error);
    }
})


module.exports = routes
