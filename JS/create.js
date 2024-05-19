const API_URL = "https://6646fa8551e227f23ab07ed0.mockapi.io/users";

let myForm = document.getElementById("createForm");
myForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    

    try {
        let data = {
            name : document.getElementById("name").value,
            mail : document.getElementById("mail").value,
            mobile :document.getElementById("mobile").value ,
            state : document.getElementById("state").value,
            city : document.getElementById("city").value,
            status : true,
            zipCode : document.getElementById("zipCode").value
        }
        let res = await fetch(API_URL,{
            headers:{
            "Content-Type" : "application/json"
            },
            method:"POST",
            body: JSON.stringify(data)
        })
        if(res.status===201)
            window.location.href="./../index.html"
        else
            alert(`${res.status} - ${res.statusText}`);


    } catch (error) {
         console.log(error);       
    }
    
})