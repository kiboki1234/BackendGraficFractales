const express= require ('express');
const {generateKoch}=require('../controllers/kochController');
const router=express.Router();

router.get('/koch', generateKoch);

module.exports = router;