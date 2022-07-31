const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({ mssg: "beskrivningPlus page" })
})
// router.get("/beskrivningplus(.html)?", (req, res) => {
//     // res.sendFile('./views/beskrivningplus(.html)?', { root: __dirname });
//     // res.render("beskrivningplus");
//     res.render("beskrivningplus", { title: "beskrivningplus" });
// });

module.exports = router;