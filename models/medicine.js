const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    name:String,
    quantity:Number,
    unit:String,
    arriveDate:String,
    expireDate:String,
    exportDate:String,
    expiredComp:Number,
    deleted:{
        type: Boolean,
        default: false
    }
});

const medicine= mongoose.model('medicine',productSchema,'MedicineData');
module.exports = medicine;
