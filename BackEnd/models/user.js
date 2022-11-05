const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    premiumUser:{
        type:Boolean
    },
    expenses:[{
    expenseAmount:{type:Number,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
}]
    // expenses:[{type:Object,required:true}]
});
// expenses:[{
//     expenseAmount:{type:Number,required:true},
//     description:{type:String,required:true},
//     category:{type:String,required:true},
// }]

module.exports=mongoose.model('User',userSchema);
//create table
// module.exports=sequelize.define('user',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         allowNull:false,
//         primaryKey:true
//     },
//     name:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     email:{
//         type:Sequelize.STRING,
//         allowNull:false,
//         unique:true
//     },
//     password:{
//         type:Sequelize.STRING,
//         allowNull:false
//     },
//     premiumUser:Sequelize.BOOLEAN
// })