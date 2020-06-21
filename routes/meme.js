var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET users listing. */
router.get('/', function (req, res, next) {


  let finalData = JSON.parse(fs.readFileSync("meme.json").toString())
  
    res.render("partials/meme", {

      myMeme: finalData
    })



});



router.get('/:id',function(req,res,next){
  const id = req.params.id

  
  res.render("partials/singlePicture",{
    imgPath:`/images/memes/${id}`,
  })
})






module.exports = router;
