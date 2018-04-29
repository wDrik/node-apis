const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = (req, res, next) => {
    Product.find({
            active: true}, 
            'title price slug active')
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getBySlug = (req, res, next) => {
    Product.findOne({ 
            slug: req.params.slug,
            active: true
        }, 'title description price slug active')
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug active')
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.post = (req, res, next) => {
    var product = new Product(req.body)
    product.save()
        .then(success => {
            res.status(201).send({
                message: 'Product successfully registered',
                data: req.body
            })
        }).catch(error => {
            res.status(201).send({
                message: 'Failed to save product',
                data: error
            })
        })
}

exports.put = (req, res, next) => {
    let id = req.params.id
    res.status(200).send({
        id: id,
        item: req.body
    })
}

exports.delete = (req, res, next) => {
    let id = req.params.id
    res.status(200).send({
        id: id,
        item: req.body
    })
}