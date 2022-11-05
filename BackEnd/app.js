const dotenv=require('dotenv');
// get config vars
dotenv.config(); //when process env gets defined
const cors=require('cors');
const express=require('express');
const bodyParser=require('body-parser')
const helmet=require('helmet');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');
const mongoose=require('mongoose');

 //routes import
const userRoutes=require('./routes/user');
const purchaseRoutes=require('./routes/purchase');
// const leaderboardRoutes=require('./routes/leaderboard');
const resetpasswordRoutes=require('./routes/resetpassword');
 //models import
// const User=require('./models/user');
// const Expense=require('./models/expense');
// const Order=require('./models/order');
// const Forgotpassword=require('./models/forgotpassword');

//middlewares
const app=express();
app.use(cors());

const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.use(morgan('combined',{stream:accessLogStream}))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
 //routes middleware
app.use('/user',userRoutes);
app.use('/purchase',purchaseRoutes);

app.use('/password',resetpasswordRoutes);

// console.log('process.env:', process.env);
//associations
// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Order);
// Order.belongsTo(User);

// User.hasMany(Forgotpassword);
// Forgotpassword.belongsTo(User);


mongoose
    .connect('mongodb+srv://root:root@cluster0.hvvefrk.mongodb.net/expensetracker?retryWrites=true')
    .then((result)=>{
        console.log("App is listening on 3000 port");
        app.listen(3000);
    })
    .catch((err)=>console.log(err));

//Sync Models with DB then listen to requests
// sequelize
//     // .sync({force:true})
//     .sync()
//     .then(result=>app.listen(3000))
//     .catch(err=>console.log(err));



