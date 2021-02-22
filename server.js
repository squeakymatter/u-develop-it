const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()
const sqlite3 = require('sqlite3').verbose() //import sqlite3 package

//add express.js middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//connect to sqlite database
const db = new sqlite3.Database('./db/election.db', (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Connected to the election database.')
})

//test express.js connection
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  })
})

//test connect to database by using SQLite method to execute SQL commands:
db.all(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows)
})
//default response for any other request (not found) - catch all
app.use((req, res) => {
  res.status(404).end()
})

//function to start express.js server
//wrap Express.js server connection in event handler so Express.js doesn't start before connection to db is established.
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
