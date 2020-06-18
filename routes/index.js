var express = require('express');
const upload = require('../utils/upload');
var router = express.Router();
const fs = require("fs")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post("/upload", function (req, res, next) {
  upload(req, res, function (err) {
    if (err)
      return res.render("index", { error: err.message })
    if (!req.file)
      return res.render("index", { error: "you need to upload a file" })
    let data = [...JSON.parse(fs.readFileSync("data.json").toString()), req.file]
    const dataJSON = JSON.stringify(data)
    fs.writeFileSync("data.json", dataJSON)
    // let finalData = JSON.parse(fs.readFileSync("data.json").toString())

    // let myPath=finalData.map(data => {
      
    //   return {myPath:`/images/originals/${data.filename}`}
    // });
    // console.log(myPath,"this is final")
    // res.render("partials/pictures", {
    //   myPath
    // })

    res.redirect("/original")
    

  })
}
)
module.exports = router;
