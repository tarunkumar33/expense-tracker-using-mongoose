const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const forgotPassSchema=new Schema({
    id:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});
module.exports=mongoose.model('ForgotPassword',forgotPassSchema);

//create table
// module.exports=sequelize.define('forgotpassword',{
//     id:{
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active:Sequelize.BOOLEAN,
//     expiresBy:Sequelize.DATE
// });