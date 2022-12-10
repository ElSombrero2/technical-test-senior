import { NextFunction, Request, Response } from 'express'
import express from 'express'
import { createWriteStream } from 'fs'
import morgan from 'morgan' 
import swaggerUi from 'swagger-ui-express'
import json from '../../../openapi/swagger.json'
import path from 'path'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})

app.use(morgan('combined', {
    stream: createWriteStream('logs/requests.log', { flags: 'a' })
}))

app.use("/api", swaggerUi.serve, swaggerUi.setup(json))

export { app }