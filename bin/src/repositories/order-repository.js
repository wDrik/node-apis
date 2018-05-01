'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async (data) => {
    let res = await Order.find({}, 'number status')
        .populate('customer', 'name')
        .populate('items.product', 'title price');

    return res;
}

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}
