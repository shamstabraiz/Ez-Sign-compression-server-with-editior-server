const router = require("express").Router();
const canvasCtrl = require("../controllers/canvasController");

router.post("/", canvasCtrl.saveData);

module.exports = router;
