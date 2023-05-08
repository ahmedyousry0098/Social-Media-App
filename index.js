process.on('uncaughtException', (err) => {
    console.log(err)
})

import express from 'express'
import authRouter from './src/modules/auth/auth.routes.js'
import profileRouter from './src/modules/profile/profile.routes.js'
import postRouter from './src/modules/post/post.routes.js'
import { connectDB } from './DB/connectDB.js'
import { globalErrorHandling } from './src/utils/ErrorHandling.js'
import { graphqlHTTP } from 'express-graphql'
import {config} from 'dotenv'
import { rootSchema } from './src/modules/GraphQL/schema.js'
config({path: './config/.env'})

const app = express()
const port = process.env.PORT || 5000
const baseURL = process.env.BASE_URL

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true
}))

app.use(`${baseURL}/`, authRouter)
app.use(`${baseURL}/profile`, profileRouter)
app.use(`${baseURL}/posts`, postRouter)
app.use('*', (req, res, next) => {
    return res.status(404).json({message: 'Page Not Found'})
})

app.use(globalErrorHandling)

process.on('unhandledRejection', (err) => {
    console.log(`${err}`)
})

app.listen(port, () => {
    console.log(`App Running On Port ${port}`)
})
