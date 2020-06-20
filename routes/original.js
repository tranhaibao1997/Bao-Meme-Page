var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET users listing. */
router.get('/', function (req, res, next) {


  let finalData = JSON.parse(fs.readFileSync("data.json").toString())

  let myPath = finalData.map(data => {

    return { myPath: `/images/originals/${data.filename}` }
  });
  console.log(myPath, "this is final")
  res.render("partials/pictures", {
    myPath
  })

});





module.exports = router;
