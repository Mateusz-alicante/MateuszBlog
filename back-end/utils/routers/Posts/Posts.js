var express = require('express')
var router = express.Router()
const bodyParser = require("body-parser");


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/savePost', async (req, res) => {
  console.log(req.body)
})

  
module.exports = router