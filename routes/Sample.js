const router = require('express').Router();

const SampleController = require("../controllers/SampleController");
const auth = require("../middleware/auth");

router.post("/save", SampleController.save)
router.get("/getAllSample", auth, SampleController.getAllSample);
module.exports = router;