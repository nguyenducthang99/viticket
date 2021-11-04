import 'dotenv/config'
import cors from 'cors'
import express from 'express'

import routes from './routes/index.js'
import database from './database/connect.js'

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// * Routes * //
app.use('/api/account', routes.account)
app.use('/api/event', routes.event)

// * Start * //

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
)
