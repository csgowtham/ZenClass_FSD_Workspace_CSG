const API_URL = "https://6646fa8551e227f23ab07ed0.mockapi.io/users";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
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
        let res = await fetch(`${API_URL}/${id}`,{
            headers:{
            "Content-Type" : "application/json"
            },
            method:"PUT",
            body: JSON.stringify(data)
        })
        if(res.status===200)
            window.location.href="./../index.html"
        else
            alert(`${res.status} - ${res.statusText}`);


    } catch (error) {
         console.log(error);       
    }
    
})

async function getData(){
    if(id){
        let res = await fetch(`${API_URL}/${id}`)
        let data = await res.json();
        if(data){
            document.getElementById("name").value = data.name;
            document.getElementById("mail").value = data.mail;
            document.getElementById("mobile").value = data.mobile;
            document.getElementById("state").value = data.state;
            document.getElementById("city").value = data.city;
            document.getElementById("zipCode").value = data.zipCode;
        }
    }
    else{
        window.location.href="/";
    }
}

getData();