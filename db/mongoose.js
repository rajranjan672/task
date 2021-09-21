const mongose = require('mongoose')

mongose.connect('mongodb://127.0.0.1:27017/task-api', {
    useNewUrlParser:true,
    useCreateIndex:true,
})