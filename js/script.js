let signupForm=document.querySelector(".signup-form");
let sAllInput=signupForm.querySelectorAll("INPUT");
let allRegData=[];
let btnClose=document.querySelectorAll(".btn-close");
let loginForm=document.querySelector(".login-form");
let lAllInput=loginForm.querySelectorAll("INPUT");
let menuBox=document.querySelector(".menu-box")
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
        
        btnClose[1].click();
        checkLogin();

       }
       else{
        swal("Wrong Password ","Please Enter Correct Password ","warning")
       }
    }
    else{
        swal("Email Not Registred ","Please Enter Correct Email ","warning")
    }
}
const logout=()=>{
    let logoutBtn=document.querySelector(".logout-btn");

    logoutBtn.onclick=(e)=>{
       localStorage.removeItem("__au__");
       swal("User Logged Out","Successfully","success")
       checkLogin();
    }
}
const checkLogin=()=>{
    if(localStorage.getItem("__au__")!=null){
        const userInfo=JSON.parse(localStorage.getItem("__au__"));
        menuBox.innerHTML=`    <a  class="dropdown-item"  href="components/uploadVideo.html">${userInfo.name}</a>
        <a class="dropdown-item logout-btn" href="#">Logout</a>
      `
      logout();
    }
    else{
        menuBox.innerHTML=`    <a  class="dropdown-item" data-bs-toggle="modal" data-bs-target="#signup-modal" href="#">Sign-up</a>
        <a class="dropdown-item" data-bs-toggle="modal" data-bs-target="#login-modal" href="#">Log-in</a>
      `
    }
}

checkLogin();