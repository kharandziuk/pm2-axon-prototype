const express = require('express')
const app = express()
const port = 3000


console.log(process.pid)

app.use(express.json())
app.post('/', (req, res) => {
  () => res.status(201).json({status: 'created'})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
