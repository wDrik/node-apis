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
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price
        }
    }).then(success => {
        res.status(200).send({
            message: 'Product updated successfully',
            data: req.body
        })
    }).catch(error => {
        res.status(400).send({
            message: 'There was an error updating product',
            data: error
        })
    })
}

exports.delete = (req, res, next) => {
    Product.findOneAndRemove({ '_id': req.params.id })
        .then(success => {
            res.status(200).send({
                message: 'Product successfully removed',
                data: req.params.id
            })
        }).catch(error => {
            res.status(400).send({
                message: 'There was an error removing the product',
                data: error
            })
        })
}