'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
}

exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
}

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
   
}

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'The title must be at least three characters');
    contract.hasMinLen(req.body.slug, 3, 'The slug must be at least three characters');
    contract.hasMinLen(req.body.description, 3, 'The description must be at least three characters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }


    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Product successfully registered',
            data: req.body
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
  
}

exports.put = async(req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({
            message: 'Product updated successfully',
            data: req.body
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
}

exports.delete = async(req, res, next) => {
    try {
        await repository.remove(req.params.id);
        res.status(200).send({
            message: 'Product successfully removed',
            data: req.params.id
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
}
