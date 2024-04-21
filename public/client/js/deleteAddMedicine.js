const deleteButton = document.querySelectorAll("[button-delete]")
if(deleteButton.length>0){
    const formDeleteMedicine = document.querySelector("#form-delete-addMedicine");
    const path = formDeleteMedicine.getAttribute("data-path");
    deleteButton.forEach(button =>{
        button.addEventListener("click",()=>{
            const isConfirm= confirm("Ban co chac khong");
            if(isConfirm){
                const id= button.getAttribute("dataId")
                action = `${path}/${id}?_method=DELETE`;
                console.log(action);
                formDeleteMedicine.action=action;
                formDeleteMedicine.submit();
            }
        })
    })
}