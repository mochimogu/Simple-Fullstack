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


routes.put('/updateUser/:id', async (req, res) => {
    try {
        const results = await db.UpdateAUser(req.params.id, req.body)
        if(results === 0) {
            return res.sendStatus(200).json({results : "success"})
        } else {
            return res.sendStatus(400).json({results : "failure"})
        }     
    } catch (error) {
        console.log(error)
        return -1   
    }
})

routes.delete('/deleteUser/:id', async (req, res) => {
    try {
        const results = await db.DeleteAUser(req.params.id)
        if(results === 0) {
            return res.sendStatus(200)
        } else {
            return res.sendStatus(400)
        }     
    } catch (error) {
        console.log(error)
        return -1   
    }
})

module.exports = routes
