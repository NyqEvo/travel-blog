const router = require("express").Router();
const { Note } = require("../../models");

// 3001/api/notes
router.get("/:post_id/:year/:month/:day", async (req, res) => {
  try {
    const noteData = await Note.findOne({
      attributes: ["info"],
      where: {
        day: req.params.day,
        mon: req.params.month,
        year: req.params.year,
        post_id: req.params.post_id,
      },
    });
    if (noteData) {
      const notes = noteData.get({ plain: true });
      console.log("this is the notes.info:" + notes.info);
      res.status(200).json(notes.info);
    } else {
      res.status(200);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("note not entered");
  }
});

// 3001/api/notes
router.post("/:post_id/:year/:month/:day", async (req, res) => {
  try {
    console.log("this is the req.body:" + req.body);
    const noteData = Note.findOne({
      where: {
        day: req.params.day,
        mon: req.params.month,
        year: req.params.year,
        post_id: req.params.post_id,
      },
    }).then(function (obj) {
      // update
      if (obj) {
        console.log("updating");
        obj.update({ info: req.body.info });
      }
      else {
        console.log("creating");
        Note.create({
          info: req.body.info,
          day: req.params.day,
          mon: req.params.month,
          year: req.params.year,
          post_id: req.params.post_id,
        });
      }
    });
    
    res.status(200).json("this is the noteData:" + noteData);
  } catch (err) {
    console.log(err);
    res.status(400).json("note not created");
  }
});

module.exports = router;
