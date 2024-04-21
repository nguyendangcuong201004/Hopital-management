const mongoose = require("mongoose");
const slug=require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
    medicineName:String,
    medicineQuantity:Number,
    medicineUnit:String,
    dateArrive:String,
    expiredDate:String,
    expiredComp:Number,
    slug:{
        type: String,
        slug:"medicineName"
    },
    deleted:{
        type: Boolean,
        default: false
    }
});

const addMedicine= mongoose.model('addMedicine',productSchema,'Medicine-Input');
module.exports = addMedicine;
