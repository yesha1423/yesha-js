let mainSection = document.getElementById("data-list-wrapper");


// pitch

let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");


// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");


//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");


//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");


//Search by title/founder


let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");
let Electronicsbtn = document.getElementById("")


// Problem 1. List of pitches on page load [3}
let ProductData=[]

function fetchdata() {
  fetch("https://project-json-server-ls7p.onrender.com/pitches")
    .then((res) => res.json())
    .then((data) => {
      cardList(data)
      ProductData=data
    })
    .catch((err) => console.log(err));
}
fetchdata();


function cardList(data) {
  let store = data.map((el) =>
    SingleCard(el.title, el.price, el.founder, el.category, el.image, el.id,el.description)
  );
  mainSection.innerHTML = store.join("");
}


function SingleCard(title, price, founder, category, image, id,description) {
  let card = `
  <div class="card" data-id=${id}>
 <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}&description=${encodeURIComponent(description)}" class="a-unique">
 <div class="card-img">
 <img src=${image} alt="Pitch">
</div>
<div class="card-body">
 <h4 class="card-title">${title}</h4>
 <p class="card-founder">Founder:${founder}</p>
 <p class="card-category">${category}</p>
 <p class="card-price">${price}</p>
 <a href="#" data-id=${id} class="card-link">Edit</a>
 <button data-id=${id} class="card-button">Delete</button>
</div>
 </a>
</div>`;
  return card;
}


// ####### POST(Add) Data Into Server
pitchCreateBtn.addEventListener("click",()=>{
  let Product={
    title: pitchTitleInput.value,
    image: pitchImageInput.value,
    category:pitchCategoryInput.value,
    founder:pitchfounderInput.value,
    price: pitchPriceInput.value,
  }
  // console.log(Product)
  fetch("https://project-json-server-ls7p.onrender.com/pitches",{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(Product)
  
  }).then((data)=>{
    alert("Data Added...")
    console.log(data)
  })
  .catch((err)=>{
    console.log(err)
    alert("Error..")
  })
})

// #####   DELETE PART  ##### //
document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("card-button")){
    console.log(e.target.dataset.id);
    DeleteProduct(e.target.dataset.id)
  }
})

function DeleteProduct(id){
  fetch(`https://project-json-server-ls7p.onrender.com/pitches/${id}`,{
    method:'DELETE',
    }).then((data)=>{
      alert("Data Deleted...")
      console.log(data)
      })
      .catch((err)=>{
        console.log(err)
        alert("Error..")
        })
}
// #####   FILTER PART   ##### //
filterFood.addEventListener("click",()=>{
  let FilterData=ProductData.filter((el)=>el.category==="Food")
  console.log(FilterData)
  cardList(FilterData)
})

filterElectronics.addEventListener("click",()=>{
  let FilterData=ProductData.filter((el)=>el.category==="Electronics")
  console.log(FilterData)
  cardList(FilterData)
})
filterPersonalCare.addEventListener("click",()=>{
  let FilterData=ProductData.filter((el)=>el.category==="Personal Care")
  console.log(FilterData)
  cardList(FilterData)
})
 
// #####   SORT PART   ##### //
sortAtoZBtn.addEventListener("click",()=>{
  let sortAtoZData=ProductData.sort((a,b)=>a.price-b.price)
  console.log(sortAtoZData)
  cardList(sortAtoZData)
})

sortZtoABtn.addEventListener("click",()=>{
  let sortZtoAData=ProductData.sort((a,b)=>b.price-a.price)
  console.log(sortZtoAData)
  cardList(sortZtoAData)
})

// UPDATE PART //
document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("card-link")){
    let id = e.target.dataset.id;
    PopulateForm(id)
  }
});
function PopulateForm(id){
  fetch(`https://project-json-server-ls7p.onrender.com/pitches/${id}`)
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data)

    updatePitchIdInput.value=data.id
    updatePitchTitleInput.value=data.title
    updatePitchPriceInput.value=data.price
    updatePitchImageInput.value=data.image
    updatePitchfounderInput.value=data.founder
    updatePitchCategoryInput.value=data.category
  })
  .catch((err)=>console.log(err))
}


// document.addEventListener("click",()=>{
//   if(e.target.classList.contains("card-link")){
//     let id = e.target.dataset.id;
//     DataAdded(id)
//   }
// })
//   function DataAdded(id){
//     fetch(`https://project-json-server-ls7p.onrender.com/pitches/${id}`,{
//       method:'PUT',
//       headers:{
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify(getProduct)
//     }).then((res)=>res.json())
//     .then((data)=>{
//         id:updatePitchIdInput.value,
//         title:updatePitchTitleInput.value,
//         image:updatePitchImageInput.value,
//         founder:updatePitchfounderInput.value,
//         category:updatePitchCategoryInput.value,
//         price:updatePitchPriceInput.value
//       alert("Data Avi Gayo...")
//       console.log(data)
//     })
//     .catch((err)=>console.log(err))
//   }


// #####   UPDATE ALL DATA   ##### //
// updatePitchBtn.addEventListener("click",()=>{
//   let updateProducctData={
//     title:updatePitchTitleInput.value,
//     price:updatePitchPriceInput.value,
//     image:updatePitchImageInput.value,
//     founder:updatePitchfounderInput.value,
//     category:updatePitchCategoryInput.value,
//     id:updatePitchIdInput.value
//   }
//   console.log(updateProducctData)

//   fetch(`https://project-json-server-ls7p.onrender.com/pitches/${updateProducctData.id}`,{
//     method:"PUT",
//     headers:{
//       "Content-Type":"application/json"
//     },
//     body:JSON.stringify(updateProducctData)

//   }).then((res)=>res.json())
//   .then((data)=>{
//     alert("Data Updated")
//     console.log(data)
//   }).catch((err)=>console.log(err))
// })

updatePitchBtn.addEventListener("click",()=>{
  let UpdateProduct={
    title:updatePitchTitleInput.value,
    price:updatePitchPriceInput.value,
    image:updatePitchImageInput.value,
    founder:updatePitchfounderInput.value,
    category:updatePitchCategoryInput.value,
    id:updatePitchIdInput.value
  }
  console.log(UpdateProduct)

  fetch(`https://project-json-server-ls7p.onrender.com/pitches/${UpdateProduct.id}`,{
    method:"PUT",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(UpdateProduct)
  })
  .then((res)=>res.json())
  .then((data)=>{
    alert("Data Added")
    console.log(data)
  })
  .catch((err)=>console.log(err))
})



// #####   UPDATE PRICE   ##### //
updatePricePitchPriceButton.addEventListener("click",()=>{
  let ipdateData={
    id:updatePitchIdInput.value,
    price:updatePitchPriceInput.value
  }
  console.log(ipdateData)
  fetch(`https://project-json-server-ls7p.onrender.com/pitches/${ipdateData.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
      },
      body:JSON.stringify(ipdateData)
      }).then((res)=>res.json())
      .then((data)=>{
        alert("Data Updated")
        console.log(data)
        }).catch((err)=>console.log(err))
      
})
