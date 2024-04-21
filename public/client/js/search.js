const formSearch= document.querySelector("#search-form")
if(formSearch){
    let url= new URL(window.location.href);
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault();
        const medicineSearch=(e.target.elements.medicineSearch.value);
        if(medicineSearch){
            url.searchParams.set("medicineSearch",medicineSearch);
        }
        else{
            url.searchParams.delete("medicineSearch");
        }
        window.location.href=url.href;
    })
}