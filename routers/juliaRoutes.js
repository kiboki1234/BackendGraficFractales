const express= require ('express');
const {generateJulia}=require('../controllers/juliaController');
const router=express.Router();

router.get('/Julia', generateJulia);

module.exports = router;