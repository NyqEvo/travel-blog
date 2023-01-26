const router = require("express").Router();

router.get("/:year/:month/:day", async (req, res) => {
  try {
    
    res.status(200).json("This is a note");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
