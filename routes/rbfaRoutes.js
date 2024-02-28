const router = require("express").Router();
const rbfaCtrl=require('../controllers/rbfaController')


router.get("/Bearer",rbfaCtrl.getToken)

module.exports=router