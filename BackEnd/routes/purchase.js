const express=require('express');
const authenticateMiddleware=require('../middlewares/auth');
const purchaseController=require('../controllers/purchase');

const router=express.Router();

router.get('/premiummembership',authenticateMiddleware.authenticate,purchaseController.purchasepremium);
router.post('/updatetransactionstatus',authenticateMiddleware.authenticate,purchaseController.updateTransactionStatus);

module.exports=router;