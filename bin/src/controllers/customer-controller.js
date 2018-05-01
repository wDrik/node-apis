'use strict';

const ValidationContract = require('../validators/validator');
const repository = require('../repositories/customer-repository');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'The name must be at least three characters');
    contract.isEmail(req.body.email, 'Invalid E-mail');
    contract.hasMinLen(req.body.password, 6, 'The pasword must be at least six characters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create(req.body);
        res.status(201).send({
            message: 'Client successfully registered',
            data: req.body
        });
    } catch (e) {
        res.status(500).send({
            message: 'Failed to process request'
        });
    }
}
