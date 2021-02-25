const express = require('express')
const router = express.Router()
const db = require('../../db/database')
const inputCheck = require('../../utils/inputCheck')

//Add a router.get('/votes') method to voteRoutes.js.

router.get('/votes', (req, res) => {
  // Declare a sql variable and set it equal to the GROUP BY query you just wrote.

  const sql = `SELECT candidates.*, parties.name AS party_name, COUNT(candidate_id) AS count
FROM votes
LEFT JOIN candidates ON votes.candidate_id = candidates.id
LEFT JOIN parties ON candidates.party_id = parties.id
GROUP BY candidate_id ORDER BY count DESC;`
  const params = []
  // Run the query with db.all().
  // In the callback function, check for errors and return a status of 500 if there are any.

  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({
      message: 'success',
      data: rows,
    })
  })
})

// The front end will need to send us IDs for the voter and candidate. Both fields are required, meaning we should probably use our friend's inputCheck() function again. We also want to avoid malicious SQL injection, which warrants using prepared statements.

router.post('/vote', ({ body }, res) => {
  // Data validation
  const errors = inputCheck(body, 'voter_id', 'candidate_id')
  if (errors) {
    res.status(400).json({ error: errors })
    return
  }

  // Prepare statement
  const sql = `INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)`
  const params = [body.voter_id, body.candidate_id]

  // Execute
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message })
      return
    }

    res.json({
      message: 'success',
      data: body,
      id: this.lastID,
    })
  })
})

module.exports = router
