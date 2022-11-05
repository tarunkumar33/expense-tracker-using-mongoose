const User=require('../models/user');
const fs = require('fs');
const path = require('path');
// const S3services=require('../services/S3services');

exports.downloadExpenses = async (req, res, next) => {
    try {
        console.log('req.user:', req.user);
        res.status(200).json(req.user.expenses)
        // const expenses = await req.user.getExpenses();
        // console.log('expenses:', expenses);
        // const stringifiedExpenses = JSON.stringify(expenses);
        // // const fileName=`expense${req.user.id}a${new Date().getTime()}.txt`;
        // const fileName = `expenses.txt`;

        // // const fileURL=await S3services.uploadToS3(stringifiedExpenses,fileName);
        // // res.status(200).json({fileURL,success:true});

        // //alternative
        // fs.writeFileSync(fileName,stringifiedExpenses);
        // // console.log("file",fs.readFileSync(fileName, "utf8"));
        // console.log('path.join(__dirname):', path.join(__dirname, ".."));
        // const options = {
        //     root: path.join(__dirname, "..")
        // };
        // res.sendFile(fileName, options, function (err) {
        //     if (err) {
        //         next(err);
        //     } else {
        //         console.log('Sent:', fileName);
        //     }
        // });
    }
    catch (err) {
        console.log('err:', err);
        res.status(500).json(err);
    }
}
exports.addExpense = async (req, res, next) => {
    try {
        console.log('body.............', req.body);
        console.log('hi...........', req.user);
        let expenses=req.user.expenses;
        expenses=[...expenses,req.body];
        req.user.expenses=expenses;
        await req.user.save();
        console.log("added expense");
        // const expenseRes = await req.user.createExpense(req.body);
        res.status(201).json({success:true,msg:"added expense"});
    }
    catch (err) {
        res.status(500).json(err);
    }
}
exports.getExpenses = async (req, res, next) => {
    try {
        const ITEMS_PER_PAGE=+req.query.rows || 2;
        const currentPage=+req.query.page ||1;
        console.log('currentPage:', currentPage)
        const offsetValue=(currentPage-1)*ITEMS_PER_PAGE;

        let expenses=req.user.expenses;
        expenses=expenses.slice(offsetValue,offsetValue+ITEMS_PER_PAGE);
        console.log('get expenses:', expenses);
        const totalExpenses=req.user.expenses.length;
        // const expenses = await req.user.getExpenses({offset:offsetValue,limit:ITEMS_PER_PAGE});
        // const totalExpenses=await req.user.countExpenses();
        
        res.status(200).json({
            expenses:expenses,
            totalExpenses:totalExpenses,
            hasPreviousPage:(currentPage>1),
            hasNextPage:(currentPage*ITEMS_PER_PAGE)<totalExpenses,
            currentPage:currentPage,
            previousPage:currentPage-1,
            nextPage:currentPage+1,
            lastPage:Math.ceil(totalExpenses/ITEMS_PER_PAGE)
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        console.log('req.params:', req.params);
        let expenses=req.user.expenses;
        expenses=[...expenses];
        expenses=expenses.filter((exp)=>exp._id!=req.params.expenseId);
        req.user.expenses=expenses;
        await req.user.save();
        console.log("deleted expense");
        // const expenseRes = await Expense.destroy({ where: { id: req.params.expenseId } });
        res.status(204).json({ success: true, message: "Deleted Successfuly" });
    }
    catch (err) {
        res.status(500).json(err);
    }
}