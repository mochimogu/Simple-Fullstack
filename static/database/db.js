const { create } = require('domain')

const pool = require('pg').Pool

require('dotenv').config()


const database = new pool({
    connectionString: `${process.env.DATABASE_URL}`,
    ssl : {
        rejectUnauthorized : false
    }
})

async function createTable() {
    try {
        const client = await database.connect()
        const query = ""
        await client.query(`
        CREATE TABLE USERS (
            ID INT AUTO_INCREMENT PRIMARY KEY,
            USERNAME VARCHAR(255) NOT NULL,
            UPASSWORD VARCHAR(255) NOT NULL,
            CREATED DATETIME TIMESTAMP DEFAULT TIMESTAMP,
            UDESCRIPTION TEXT,
            LAST_MODIFIED TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`
        )
        await client.release(query)
    } catch (error) {
        console.log("ERROR")
        return -1
    }
}

async function insertUser(data) {
    try {
        const client = await database.connect()
        const query = `
            INSERT INTO USERS(USERNAME, UPASSWORD, UDESCRIPTION) 
            VALUES($1, $2, $3)
            `
        const value = [data.username, data.password, data.desc]
        await client.query(
            query,
            value
        )
        await client.release(query)
        return 0
    } catch (error) {
        console.log(error)
        return -1
    }
}

async function getAllUsers() {
    try {
        const client = await database.connect()
        const results = await client.query(
            `SELECT * FROM USERS`
        )
        await client.release()
        return results.rows
    } catch (error) {
        console.log(error)
        return -1
    }
}

async function UpdateAUser(data) {

    try {
        const client = await database.connect();
        const query = `
            UPDATE USERS
            SET USERNAME = $1,
                UPASSWORD = $2,
                UDESCRIPTION = $3,
                LAST_MODIFIED = CURRENT_TIMESTAMP
            WHERE ID = $4
        `
        const value = []
        const results = await client.query(query, value)

        if (results.rowCount === 0) {
            await client.release();
            return -1
        }

        await client.release()
        return 0        

    } catch (error) {
        console.log(error)
        return -1;
    }


}


module.exports = { insertUser, getAllUsers }
