'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async() => {
    let res = await Product.find({
        active: true
    },'title description price slug active');

    return res;
}

exports.getBySlug = async(slug) => {
    let res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug active');

    return res;
}

exports.getById = async(id) => {
    let res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tag) => {
    let res = await Product.find({
        tags: tag,
        active: true
    }, 'title description price slug active');

    return res;
}

exports.create = async(data) => {
    var product = new Product(data)
    await product.save()
}

exports.update = async(id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            slug: data.slug,
            price: data.price
        }
    })
}

exports.remove = async(id) => {
    await Product.findOneAndRemove({ '_id': id })
}
