const express = require('express')
const mongoose = require('mongoose')

// Connect to mongoDB
const db = 'mongodb+srv://demo:demo@cluster0.to7aj.mongodb.net/authentication?retryWrites=true&w=majority'
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => {
    const app = express()
    const {
        APP_PORT = 5000,
        NODE_ENV = 'development'
    } = process.env

    const IN_PROD = NODE_ENV === 'production'

    app.disable('x-powered-by')
    // Running Express
    app.use(express.json());

    app.use('/api/auth', require('./routes/auth'))
    app.listen({ port: APP_PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${APP_PORT}`)
    )
})
.catch(err => console.log(err))

