var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET users listing. */
router.get('/', function (req, res, next) {


  let finalData = JSON.parse(fs.readFileSync("meme.json").toString())
  console.log(finalData)

  let newData = finalData.map(data =>{
    return {...data, imgId:data.img.split("/")[3]}
  })
  console.log(newData)
    res.render("partials/meme", {

      myMeme: newData
    })



});

router.get('/:id',function(req,res,next){
  const id = req.params.id
  console.log(id.split("+"),"fmsaidjhoijduishdaiudhuaishdusiah")
  
  res.render("partials/singlePicture",{
    imgPath:`/images/originals/${id.split("+")[0]}`,
    top:id.split("+")[1],
    bottom:id.split("+")[2]
  })
})





module.exports = router;
