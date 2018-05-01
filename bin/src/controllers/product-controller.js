const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/validator')
const repository = require('../repositories/product-repository')

exports.get = (req, res, next) => {
    repository.get()
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getBySlug = (req, res, next) => {
    repository.getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getByTag = (req, res, next) => {
    repository.getByTag(req.params.tag)
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'The title must be at least three characters')
    contract.hasMinLen(req.body.slug, 3, 'The slug must be at least three characters')
    contract.hasMinLen(req.body.description, 3, 'The description must be at least three characters')

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

   repository.create(req.body)
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
    repository.update(req.params.id, req.body)
    .then(success => {
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
    repository.remove(req.params.id)
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