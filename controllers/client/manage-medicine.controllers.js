const Medicine= require("../../models/medicine");
const addMedicine = require("../../models/medicine-save");
const AddMedicine= require("../../models/medicine-save")
module.exports.index= async(req, res) => {
    let find={
        deleted:false
    }
    let type=req.query.typeofdisplay;
    let medicineSearch=req.query.medicineSearch;
    let medicine;
    let typeName;
    if(medicineSearch){
        const regex= new RegExp(medicineSearch,"i");
        find.name = regex;
    }
    if(type){
        if(type=="op1"){
            console.log("cccccccccc")
            medicine= await Medicine.find(find).sort({name:1});
            typeName="Sắp xếp theo thứ tự bảng chữ cái"
            console.log(medicine);
        }
        if(type=="op2"){
            medicine= await Medicine.find(find).sort({expiredComp:1});
            console.log(medicine);
            typeName="Sắp xếp theo hạn sử dụng"
        }

    }
    else{
        medicine = await Medicine.find(find);
        typeName="Tìm kiếm theo"
    // console.log(medicine);
    }
    res.render("client/pages/manage-medicine/index",{
        medicine: medicine,
        medicineSearch: medicineSearch,
        typeName:typeName
    })
 }
 module.exports.addProduct= async(req, res) => {
     const addMedicine = await AddMedicine.find({
     });
     console.log(addMedicine);
 
     res.render("client/pages/manage-medicine/addProduct",{
         addMedicine: addMedicine,
     })
  }
module.exports.addProductPost= async(req, res) => {
    
    let arriveDateArray= (req.body.dateArrive).split("-");
    arriveDateArray.reverse();
    req.body.dateArrive=arriveDateArray.join("-");
    
    let expiredDateArray= (req.body.expiredDate).split("-");
    expiredDateArray.reverse();
    let expiredComp=parseInt(expiredDateArray[0])+expiredDateArray[1]*30+expiredDateArray[2]*365;
    req.body.expiredDate=expiredDateArray.join("-");

    req.body.medicineQuantity = parseInt(req.body.medicineQuantity);
    req.body.expiredComp= expiredComp;

    const newProduct= new AddMedicine(req.body);
    await newProduct.save();
    res.redirect("/manage-medicine/add-medicine")
}
module.exports.deleteAddProduct= async(req, res) => {
    const id = req.params.id;
    await AddMedicine.deleteOne( {_id: id} );

    res.redirect("back");

 }
 module.exports.deleteProduct= async(req, res) => {
    const id = req.params.id;
    await Medicine.deleteOne( {_id: id} );

    res.redirect("back");

 }
 module.exports.addAllProduct= async(req, res) => {
    const addProduct= await addMedicine.find();
    console.log(addProduct);
    for(let i=0;i<addProduct.length;i++){
        const NewProduct= new Medicine({
            name:addProduct[i].medicineName,
            quantity:addProduct[i].medicineQuantity,
            unit:addProduct[i].medicineUnit,
            arriveDate:addProduct[i].dateArrive,
            expireDate:addProduct[i].expiredDate,
            expiredComp:addProduct[i].expiredComp,
            exportDate:"-",
        })
        console.log(NewProduct)
        await NewProduct.save();
    } 
    await addMedicine.deleteMany();
    res.redirect("/manage-medicine");

 }

