const router = require("express").Router();
const { Note } = require('../../models');

router.get("/:year/:month/:day", async (req, res) => {
  try {
    const noteData = await Note.findAll(
      {
        attributes: ['info'],
        where: {
          day: req.params.day,
          mon: req.params.month,
          year: req.params.year
        }
      },
    );

    const notes = noteData.get({ plain: true });
    res.status(200).json(notes);
  } catch (err) {
    res.status(200).json("enter text here");
  }
});

router.post("/:year/:month/:day", async (req, res) => {
  try {
    const noteData = await Note.create({
      info: req.body.info,
      day: req.params.day,
      mon: req.params.month,
      year: req.params.year,
      post_id: req.params.post_id
    })
    res.status(200).json(noteData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
