const addAllMedicineButton = document.querySelector("#button-add")
console.log(addAllMedicineButton);
const formAddAllMedicine= document.querySelector("#form-add-all-products")
addAllMedicineButton.addEventListener("click",()=>{
    const isConfirm= confirm("Ban co chac khong");
    if(isConfirm){
        formAddAllMedicine.submit();
    }
})
