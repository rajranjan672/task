const express = require('express')
require('./db/mongoose-')
const user_router = require('./Route/user')

const app = express()
const port =process.env.PORT || 3000


app.use(express.json())
app.use(user_router)



app.listen(port, () => {
    console.log('Server is up' + port)
})