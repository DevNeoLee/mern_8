const express = require('express')
const router = express.Router()

router.get('/', (req, res)=> {
    return res.json({ msg: "This is the game route"})
})

module.exports = router;
 
