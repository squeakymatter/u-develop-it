const express = require('express')

const PORT = process.env.PORT || 3001
const app = express()

//add express.js middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//test express.js connection
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  })
})

//default response for any other request (not found) - catch all
app.use((req, res) => {
  res.status(404).end()
})

//function to start express.js server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
