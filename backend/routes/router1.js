const express = require('express')
const router = express.Router()
const db = require('../database_config/DB_connection')


router.route('/search/:text')
    .get(async (req, res) => {
        try {
            let data = await db.get().collection('STOCKS_INFO').find({ Name: { $regex: req.params.text, $options: 'i' } }).toArray()
            res.status(200).send(data)
        } catch (err) {
            res.status(400).send(err)
        }
    })

router.route('/details/:text')
    .get(async (req, res) => {
        try {
            let data = await db.get().collection('STOCKS_INFO').find({ Name: req.params.text }).toArray()
            res.status(200).send(data)
        } catch (err) {
            res.status(400).send(err)
        }
    })

module.exports = router