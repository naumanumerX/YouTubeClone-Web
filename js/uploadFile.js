if (localStorage.getItem("__au__") != null) {
    const userInfo = JSON.parse(localStorage.getItem("__au__"));
    let uploadModal = document.querySelector("#upload-modal");
    let form = uploadModal.querySelector("form");
    let allInput = form.querySelectorAll("input");
    let allUploadData = [];
    let btnClose = uploadModal.querySelector(".btn-close");
    let videoList = document.querySelector(".video-list");
  
    if (localStorage.getItem("allUploadData") != null) {
      allUploadData = JSON.parse(localStorage.getItem("allUploadData"));
    }
  
    let videoUrl = "";
    let thumnailUrl = "";
  
    //reading thumbnail and video
    let fReader = new FileReader();
    allInput[0].onchange = () => {
      fReader.readAsDataURL(allInput[0].files[0]);
      fReader.onload = (e) => {
        videoUrl = e.target.result;
      };
    };
  
    allInput[1].onchange = () => {
      fReader.readAsDataURL(allInput[1].files[0]);
      fReader.onload = (e) => {
        thumnailUrl = e.target.result;
      };
    };
  
    form.onsubmit = (e) => {
      e.preventDefault();
      allUploadData.push({
        video: videoUrl,
        thumb: thumnailUrl,
        title: allInput[2].value,
        desc: allInput[3].value,
      });
      localStorage.setItem("allUploadData", JSON.stringify(allUploadData));
      swal("Data Uploaded Successfully", "successfully", "success");
      btnClose.click();
      
      // Call readData to refresh the table
      readData();
    };
  
    const readData = () => {
      videoList.innerHTML = " ";
      allUploadData.forEach((data, index) => {
        videoList.innerHTML += `
          <tr>
            <td>${index + 1}</td>
            <td>
              <img src="${data.thumb}" width="40%" alt="">
            </td>
            <td>
              <img src="${data.video}" width="40%" alt="">
            </td>
            <td>${data.title}</td>
            <td>${data.desc}</td>
            <td>
              <button class="btn btn-danger p-1 px-2"> <i class="fa fa-trash"></i></button>
            </td>
          </tr>`;
      });
    };
  
    // Call readData initially to populate the table if there's existing data
    readData();
  } else {
    window.location = "../index.html";
  }
  