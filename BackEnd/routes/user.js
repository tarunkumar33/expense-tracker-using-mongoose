const express=require('express');
const router=express.Router();
const userControllers=require('../controllers/user');
const expenseControllers=require('../controllers/expense');
const authenticateMiddleware=require('../middlewares/auth');

router.post('/signup',userControllers.signupUser);
router.post('/login',userControllers.loginUser);
router.post('/addExpense',authenticateMiddleware.authenticate,expenseControllers.addExpense);
router.get('/getExpenses',authenticateMiddleware.authenticate,expenseControllers.getExpenses);
router.delete('/deleteExpense/:expenseId',authenticateMiddleware.authenticate,expenseControllers.deleteExpense);
router.get('/download',authenticateMiddleware.authenticate,expenseControllers.downloadExpenses);


module.exports=router;