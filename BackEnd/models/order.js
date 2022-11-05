const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const orderSchema=new Schema({
    paymentId:{
        type:String
    },
    orderId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});
module.exports=mongoose.model('Order',orderSchema);

//create table
// module.exports=sequelize.define('order',{
//     id:{
//         type:Sequelize.INTEGER,
//         autoIncrement:true,
//         primaryKey:true,
//         allowNull:false
//     },
//     paymentId:Sequelize.STRING,
//     orderId:Sequelize.STRING,
//     status:Sequelize.STRING
// })