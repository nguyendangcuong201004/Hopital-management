const { render } = require("pug");
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
    var today = new Date();
    let currentDate= today.getDate()+(today.getMonth()+1)*30+(today.getFullYear())*365;
    console.log(currentDate);
    res.render("client/pages/manage-medicine/indexFinal-unlogin",{
        medicine: medicine,
        medicineSearch: medicineSearch,
        typeName:typeName,
        currentDate: currentDate
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
 module.exports.editProduct= async(req, res) => {

    const id = req.params.id;
    const editMedicine= await Medicine.findOne( {_id: id} );
    let arriveDateArray= (editMedicine.arriveDate).split("-");
    arriveDateArray.reverse();
    arriveDate=arriveDateArray.join("-");
    
    let expireDateArray= (editMedicine.expireDate).split("-");
    expireDateArray.reverse();
    expireDate=expireDateArray.join("-");
    console.log(editMedicine)
    res.render("client/pages/manage-medicine/editProduct",{
        medicine: editMedicine,
        arriveDate: arriveDate,
        expireDate: expireDate
    })
 }
 module.exports.editProductPost= async(req, res) => {
    const id = req.params.id;
    let arriveDateArray= (req.body.dateArrive).split("-");
    arriveDateArray.reverse();
    req.body.dateArrive=arriveDateArray.join("-");
    
    let expiredDateArray= (req.body.expiredDate).split("-");
    expiredDateArray.reverse();
    let expiredComp=parseInt(expiredDateArray[0])+expiredDateArray[1]*30+expiredDateArray[2]*365;
    req.body.expiredDate=expiredDateArray.join("-");

    req.body.medicineQuantity = parseInt(req.body.medicineQuantity);
    req.body.expiredComp= expiredComp;
    console.log(req.body)
    await Medicine.updateOne({_id:id},{
            name:req.body.medicineName,
            quantity:req.body.medicineQuantity,
            unit:req.body.medicineUnit,
            arriveDate:req.body.dateArrive,
            expireDate:req.body.expiredDate,
            expiredComp:req.body.expiredComp,
            exportDate:"-",
    })
    res.redirect("/manage-medicine");
}