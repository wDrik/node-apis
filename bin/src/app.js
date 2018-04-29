const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const index = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.2'
    })
})

const store = router.post('/', (req, res, next) => {
    res.status(201).send(req.body)
})

const update = router.put('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).send({ 
        id: id, 
        item: req.body
    })
})

const remove = router.delete('/:id', (req, res, next) => {
    let id = req.params.id
    res.status(200).send({
        id: id,
        item: req.body
    })
})

app.use('/', index)
app.use('/products', store)
app.use('/products', update)
app.use('/products', remove)

module.exports = app
