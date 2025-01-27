//showAllBtn flag variable.
let flag = 0;
const showBtn = document.querySelector("#showAllBtn");
const fetchedAPI = async (searchText, status) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    displayUI(data.data, status);
  } catch (err) {
    console.log(err);
  }
};

fetchedAPI("iphone", "normal");

function displayUI(infos, status) {
  const parentContainer = document.querySelector("#main-phone-container");
  parentContainer.textContent = "";
  //   console.log(infos.length);
  //   if(infos.length===0){
  //     console.log('Not found!')
  //   }
  if (infos.length > 10) {
    if (status === "normal") {
      infos = infos.slice(0, 9);
    }
    showBtn.classList.remove("hidden");
  } else if (infos.length <= 10) {
    showBtn.classList.add("hidden");
  }
  for (let info of infos) {
    const childCard = document.createElement("div");
    childCard.classList.add(
      "border",
      "p-5",
      "rounded-xl",
      "border-gray-200",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "space-y-4"
    );
    childCard.innerHTML = `
                    <div class="card-img bg-[#0D6EFD0D] w-full p-4 rounded-xl">
                        <img src="${info?.image}" alt="phone-picture" class="w-36 mx-auto">
                    </div>
                    <h5 class="text-2xl font-bold">${info?.phone_name}</h5>
                    <p class="text-sm font-light text-center">There are many variations of passages of available, but the majority have suffered</p>
                    <p class="text-xl font-bold">$999</p>
                    <a onclick="singleDataHandler('${info?.slug}')" class="btn bg-blue-600 py-2 px-8 text-white" id="showDetailsBtn">Show Details</a>
                    `;
    parentContainer.classList.add("grid");
    parentContainer.appendChild(childCard);
  }
  if (infos.length === 0) {
    const childCard = document.createElement("div");
    parentContainer.classList.remove("grid");
    childCard.innerHTML = `
    <p class="text-red-500 text-center text-xl font-semibold">Nothing found</p>
    `;
    parentContainer.appendChild(childCard);
  }
  loadingSpinner(false);
}

document.querySelector("#search-btn").addEventListener("click", () => {
  const searchedVal = document.querySelector("#search-input").value;
  if (searchedVal === "") {
    fetchedAPI("iphone", "normal");
  } else {
    fetchedAPI(searchedVal.trim(), "normal");
  }
});

document.querySelector("#search-input").addEventListener("keyup", (e) => {
  loadingSpinner(true);
  if (e.target.value === "") {
    fetchedAPI("iphone", "normal");
  } else {
    fetchedAPI(e.target.value.trim(), "normal");
  }
});

showBtn.addEventListener("click", () => {
  const searchedVal2 = document.querySelector("#search-input").value;
  console.log(searchedVal2);
  if (flag === 0) {
    if (searchedVal2 === "") {
      fetchedAPI("iphone");
      showBtn.innerText = "Hide";
      showBtn.classList = `btn bg-red-500 text-white py-2 px-8`;
      flag = 1;
    } else {
      fetchedAPI(searchedVal2);
      showBtn.innerText = "Hide";
      showBtn.classList = `btn bg-red-500 text-white py-2 px-8`;
      flag = 1;
    }
  } else if (flag === 1) {
    if (searchedVal2 === "") {
      fetchedAPI("iphone", "normal");
      showBtn.innerText = "Show All";
      showBtn.classList.remove("bg-red-500");
      showBtn.classList = `btn bg-blue-600 text-white py-2 px-8`;
      flag = 0;
    } else {
      fetchedAPI(searchedVal2, "normal");
      showBtn.innerText = "Show All";
      showBtn.classList.remove("bg-red-500");
      showBtn.classList = `btn bg-blue-600 text-white py-2 px-8`;
      flag = 0;
    }
  }
});

// Loading Spinner
const loadingSpinner = (isLoading) => {
  const spinner = document.querySelector("#loading-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
// Loading body Spinner
const bodySpinner = (isLoading) => {
  const spinner = document.querySelector("#body-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// showDetailsBtn

const singleDataHandler = async (id) => {
  bodySpinner(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data.data);
  showModalOnUI(data.data);
};

const showModalOnUI = (infos) => {
  // this method below is from daisyUI.
  modal_details.showModal();
  //   console.log(infos);
  const modalContainer = document.querySelector("#modal_details");
  modalContainer.classList.remove("hidden");
  modalContainer.innerHTML = `
    <div class="modal-box w-auto h-auto">
                <div class="p-4" id="showModalCard">
                    <div class="modal-img bg-[#0D6EFD0D] w-full p-4 rounded-xl">
                        <img src="${
                          infos.image
                        }" alt="phone-picture" class="w-36 mx-auto">
                    </div>
                    <h5 class="text-xl font-bold">${infos.name}</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">Release Date: </span> ${
                      infos?.releaseDate
                    }</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">Storage:</span> ${
                      infos?.mainFeatures?.storage
                    }</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">Chipset: </span> ${
                      infos?.mainFeatures?.chipSet
                    }</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">Display Size :</span> ${
                      infos?.mainFeatures?.displaySize
                    }</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">Memory: </span> ${
                      infos?.mainFeatures?.memory
                    }</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">Brand: </span> ${
                      infos?.brand
                    }</h5>
                    <h5 class="text-[12px]"><span class="text-base font-bold">GPS: </span> ${
                      infos?.others?.GPS ?? "NOT AVAILABLE"
                    }</h5>
              
                  </div>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn bg-red-600 text-white">Close</button>
                </form>
              </div>
            </div>
  `;
  bodySpinner(false);
};

//another scenario for showAllBtn
//showAllBtn flag variable.
// let flag=0;
// const showBtn=document.querySelector("#showAllBtn");
// const fetchedAPI = async (searchText,status) => {
//   try {
//     const res = await fetch(
//       `https://openapi.programming-hero.com/api/phones?search=${searchText}`
//     );
//     const data = await res.json();
//     if(status==="normal"){
//         displayUI(data.data.slice(0,6));
//         // ShowAll Button Reset
//         flag=0;
//         showBtn.innerText="Show All"
//         showBtn.classList.remove("bg-red-500");
//         showBtn.classList=`btn bg-blue-600 text-white py-2 px-8`;
//     }
//     else{
//         displayUI(data.data)
//     }
//   } catch(err) {
//     console.log(err);
//   }
// };

// fetchedAPI("iphone","normal");

// function displayUI(infos) {
//   const parentContainer = document.querySelector("#main-phone-container");
//   parentContainer.textContent = "";
//   for (let info of infos) {
//     const childCard = document.createElement("div");
//     childCard.classList.add(
//       "border",
//       "p-5",
//       "rounded-xl",
//       "border-gray-200",
//       "flex",
//       "flex-col",
//       "items-center",
//       "justify-center",
//       "space-y-4"
//     );
//     childCard.innerHTML = `
//                     <div class="card-img bg-[#0D6EFD0D] w-full p-4 rounded-xl">
//                         <img src="${info.image}" alt="phone-picture" class="w-36 mx-auto">
//                     </div>
//                     <h5 class="text-2xl font-bold">${info.phone_name}</h5>
//                     <p class="text-sm font-light text-center">There are many variations of passages of available, but the majority have suffered</p>
//                     <p class="text-xl font-bold">$999</p>
//                     <a class="btn bg-blue-600 py-2 px-8 text-white">Show Details</a>
//         `;
//     parentContainer.appendChild(childCard);
//   }
// }

// document.querySelector("#search-btn").addEventListener("click", () => {
//   const searchedVal = document.querySelector("#search-input").value;
//   if(searchedVal===""){
//     fetchedAPI("iphone","normal");
//   }
//   else{
//     fetchedAPI(searchedVal,"normal");
//   }
// });

// document.querySelector("#search-input").addEventListener("keyup", (e) => {
//   if (e.target.value === "") {
//     fetchedAPI("iphone","normal");
//   } else {
//     fetchedAPI(e.target.value,"normal");
//   }
// });

// showBtn.addEventListener("click",()=>{
//     const searchedVal2 = document.querySelector("#search-input").value;
//     console.log(searchedVal2)
//     if(flag===0){
//         if(searchedVal2===""){
//             fetchedAPI("iphone","notnormal");
//             showBtn.innerText="Hide";
//             showBtn.classList=`btn bg-red-500 text-white py-2 px-8`;
//             flag=1;
//         }else{
//             fetchedAPI(searchedVal2,"notnormal");
//             showBtn.innerText="Hide";
//             showBtn.classList=`btn bg-red-500 text-white py-2 px-8`;
//             flag=1;
//         }
//     }else if(flag===1){
//         if(searchedVal2===""){
//             fetchedAPI("iphone","normal");
//             showBtn.innerText="Show All";
//             showBtn.classList.remove("bg-red-500");
//             showBtn.classList=`btn bg-blue-600 text-white py-2 px-8`;
//             flag=0;
//         }else{
//             fetchedAPI(searchedVal2,"normal");
//             showBtn.innerText="Show All";
//             showBtn.classList.remove("bg-red-500");
//             showBtn.classList=`btn bg-blue-600 text-white py-2 px-8`;
//             flag=0;
//         }
//     }
// })
