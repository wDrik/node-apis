const express   = require('express');
const router    = express.Router();

const index = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.2'
    });
});

module.exports = router;
