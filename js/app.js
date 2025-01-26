const fetchedAPI= async()=>{
    const res= await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data=await res.json();
    displayUI(data.data);
}
fetchedAPI();

const parentContainer=document.querySelector("#main-phone-container");
function displayUI(infos){
    for(let info of infos){
        const childCard=document.createElement("div");
        childCard.classList.add("border","p-5","rounded-xl","border-gray-200","flex","flex-col","items-center","justify-center","space-y-4");
        childCard.innerHTML=`
                    <div class="card-img bg-[#0D6EFD0D] w-full p-4 rounded-xl">
                        <img src="${info.image}" alt="phone-picture" class="w-36 mx-auto">
                    </div>
                    <h5 class="text-2xl font-bold">${info.phone_name}</h5>
                    <p class="text-sm font-light text-center">There are many variations of passages of available, but the majority have suffered</p>
                    <p class="text-xl font-bold">$999</p>
                    <a class="btn bg-blue-600 py-2 px-8 text-white">Show Details</a>
        `
        parentContainer.appendChild(childCard);
    }
}