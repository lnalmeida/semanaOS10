const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const app = express()
mongoose.connect('mongodb+srv://omnistack10:omnistack10@cluster0-sve8q.mongodb.net/OS10?retryWrites=true&w=majority',
                {useNewUrlParser: true,
                 useUnifiedTopology: true,
                 useCreateIndex: true,
                 useFindAndModify: false})

const port = 3333

app.use(express.json())
app.use(cors()) 
app.use(routes)

//Query Params: request.query (filtrar, ordenar, paginar...)
//route Params: request.params (identificar um recurso para alterar ou remover)
//Body: request.body (dados para criação ou alteração de um registro)

app.listen(port, () => console.log(`Server on-line na porta ${port}!`))