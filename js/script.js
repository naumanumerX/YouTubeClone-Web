let signupForm=document.querySelector(".signup-form");
let sAllInput=signupForm.querySelectorAll("INPUT");
let allRegData=[];
let btnClose=document.querySelectorAll(".btn-close");
let loginForm=document.querySelector(".login-form");
let lAllInput=loginForm.querySelectorAll("INPUT");

if(localStorage.getItem("allRegData")!=null)
{
    allRegData=JSON.parse(localStorage.getItem("allRegData"));
}

signupForm.onsubmit=(e)=>{
    e.preventDefault();
   
    let checkEmail=allRegData.find((data)=>data.email==sAllInput[1].value);
   
        if(checkEmail==undefined){
            allRegData.push({
                name:sAllInput[0].value,
                email:sAllInput[1].value,
                password:sAllInput[2].value,
                mobile:sAllInput[3].value
            });
          localStorage.setItem("allRegData",JSON.stringify(allRegData));
          btnClose[0].click(); 
          swal("Registration ","Successfully","success")
         /**This is not closing the modal */
           
          //console.log(btnClose[0])
        }
        else{
            swal("Data Already Registred ","Please log-in  ","warning   ")

        }
}

loginForm.onsubmit=(e)=>{
    e.preventDefault();
    let email=allRegData.find((data)=>data.email==lAllInput[0].value);
    
    if(email!=undefined){
       // console.log(email);
       if(email.password==lAllInput[1].value){
        localStorage.setItem("__au__",JSON.stringify(email));
        window.location="index.html";
        btnClose[1].click();

       }
       else{
        swal("Wrong Password ","Please Enter Correct Password ","warning")
       }
    }
    else{
        swal("Email Not Registred ","Please Enter Correct Email ","warning")
    }
}