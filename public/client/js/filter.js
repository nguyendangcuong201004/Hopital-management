const formType= document.querySelector("#type-form")
if(formType){
    let url= new URL(window.location.href);
    formType.addEventListener("submit",(e)=>{
        e.preventDefault();
        console.log(e);
        const displayType=(e.target.elements.typeofdisplay.value);
        if(displayType){
            url.searchParams.set("typeofdisplay",displayType);
        }
        else{
            url.searchParams.delete("typeofdisplay");
        }
        window.location.href=url.href;
    })
}