const express = require('express')
const app = express()
const port = 3000
const pino = require('pino')

const logger = pino()

app.use(express.json())
app.post('/', (req, res) => {
  () => res.status(201).json({status: 'created'})
})

app.listen(port, () => logger.info(`Example app listening on port ${port}!`))
