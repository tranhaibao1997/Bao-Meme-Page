var express = require('express');
var router = express.Router();
const fs = require("fs")
let jimp = require('jimp')
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



router.post("/addText/:id", async (req, res, next) => { // the path can be changed depends on your code, 
  console.log(" Chạy zô đây")
  try {
    if (!req.body.top && !req.body.bottom) {
      console.log("khong có")
      return res.render("pictures", { error: "need to put text" });
    }
    const data = JSON.parse(fs.readFileSync("data.json").toString()) // load original data first 


    const file = data.find(
      (item) => item.filename === req.params.id
    );
    if (!file) {
      console.log("no file", req.params.id);
      return;
    }
    const dimension = 300 // control the image size

    const image = await jimp.read(file.path); // get original image

    const font = await jimp.loadFont(jimp.FONT_SANS_32_WHITE); // set the font

    image.resize(400,400)


    image.print(
      font,
      0,
      0,
      {
        text: req.body.top,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_TOP // if you want to know what it is, check the jimp document 
      },
      400,
      400
    );


    image.print(
      font,
      0,
      0,
      {
        text: req.body.bottom,
        alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: jimp.VERTICAL_ALIGN_BOTTOM, // if you want to know what it is, check the jimp document 
      },
      400,
      400
    );


    const newMeme = Date.now().toString() + file.filename;
    await image.writeAsync(`public/images/memes/${newMeme}`); // save the image with text 
    //save meme image information into meme.json file, and you know how to do it already. 
    //code or function will be here



    let data1 = [...JSON.parse(fs.readFileSync("meme.json").toString()), {img:newMeme}]
    const dataJSON = JSON.stringify(data1)
    fs.writeFileSync("meme.json", dataJSON)
    res.send("OK")
    // return res.redirect("/meme"); // this path can be changed depends on your code
  } catch (err) {
    next(err);
  }
});





module.exports = router;
