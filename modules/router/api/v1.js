const express = require ('express');
const router = express.Router();

const DrAuthController = require ("../../controllers/v1/auth/DrAuthController")
router.post('/dr-regitration' , DrAuthController.register.bind(DrAuthController));
router.post('/dr-login' , DrAuthController.login.bind(DrAuthController));




module.exports = router;