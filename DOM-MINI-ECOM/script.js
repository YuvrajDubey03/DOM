const createBtn = document.querySelector(".create");
const formDiv = document.querySelector(".form");
const closeFormBtn = document.querySelector("#close-form");
const form = document.querySelector("form");
const productsDiv = document.querySelector(".products");



createBtn.addEventListener("click", () => {
    formDiv.style.display = "flex";
});
closeFormBtn.addEventListener("click", () => {
    formDiv.style.display = "none";
});



const productsArr = JSON.parse(localStorage.getItem("products"));
console.log(productsArr);




let updateIndex = null;

const ui = ()=>{
    productsDiv.innerHTML = "";
    
    productsArr.forEach((product,index)=>{
        productsDiv.innerHTML += ` <div class="product-card">
            <div class="img">
                <img src="${product.Image}">
            </div>
            <div class="text">
                <h3>${product.productName}  </h3>
                <p>${product.Description}</p>
                <p>$${product.Price}</p>
            </div>
            <div class="btns">
                <button onclick="updateProduct('${product.productName}')" class="update-btn">Update</button>
                <button onclick="deleteProduct(${index})" class="delete-btn">Delete</button>
            </div>
        </div>`

    })
}

ui();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let productName =  e.target[0].value;
    let Description = e.target[1].value;
    let Price = e.target[2].value;
    let Image = e.target[3].value;
   if(productName.trim() === "" || Description.trim() === "" || Price.trim() === "" || Image === ""){
       alert("Please fill all the fields");
       return;
   }
    let obj ={
        productName,
        Description,
        Price,
        Image

    }
    if(updateIndex !== null){
        productsArr[updateIndex] = obj;
        updateIndex = null;
        localStorage.setItem("products", JSON.stringify(productsArr));
        // ui();
       
    }else{
        productsArr.push(obj);  
        localStorage.setItem("products", JSON.stringify(productsArr));
    }




   
    ui();
    form.reset();
    formDiv.style.display = "none";
  
})


const updateProduct = (name) => {
     formDiv.style.display = "flex";
    let product = productsArr.find((product) => product.productName === name);
    updateIndex = productsArr.findIndex((product) => product.productName === name); 
   
   form[0].value = product.productName;
   form[1].value = product.Description;
   form[2].value = product.Price;
   form[3].value = product.Image;


}
const deleteProduct = (index) => {
    productsArr.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productsArr));
    ui();
}