var pNameElement = document.getElementById('productNameInput');
var pPriceElement = document.getElementById('productPriceInput');
var pCategoryElement = document.getElementById('productCategoryInput');
var pDescriptionElement = document.getElementById('productDescriptionInput');

var productContainer =  []
if(localStorage.getItem("products")== null)
{productContainer=[]}
else{ 
productContainer = JSON.parse(localStorage.getItem("products"));
displayProducts(productContainer);
}




function addProduct (){
 if (validateProductName()){
    var newProduct = {

        nameValue: pNameElement.value,
        priceValue: pPriceElement.value,  
        categoryValue: pCategoryElement.value,  
        descriptionValue: pDescriptionElement.value

    }
    productContainer.push(newProduct);
    localStorage.setItem("products", JSON.stringify( productContainer ));
    displayProducts(productContainer);
    clear();
}
}



function displayProducts(productList){
    var cartoona=``;
    for(var i =0 ; i< productList.length ; i++)
    {
        cartoona += `
     <tr>
        <td>${i+1}</td>
        <td>${productList[i].nameValue}</td>
        <td>${productList[i].priceValue}</td>
        <td>${productList[i].categoryValue}</td>
        <td>${productList[i].descriptionValue}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
        <td><button onclick="UpdateProduct(${i})" class="btn btn-warning">Update</button></td>

   
     </tr>`
    }
    document.getElementById('tableRow').innerHTML=cartoona;
    
};
displayProducts(productContainer);


function clear(){
    pNameElement.value='',
    pPriceElement.value='',
    pCategoryElement.value='',
    pDescriptionElement.value=''

};



function deleteProduct (productIndex) {
    productContainer.splice(productIndex,1);
    displayProducts(productContainer);
    localStorage.setItem("products", JSON.stringify( productContainer ));
    

};



function searchProducts(term){
    var searchProducts=[];
 for(var i=0 ; i< productContainer.length ; i++)
 if(productContainer[i].nameValue.toLowerCase().includes(term.toLowerCase())==true)
 searchProducts.push(productContainer[i]);
 displayProducts(searchProducts) 
    };
    


function UpdateProduct(index){
    pNameElement.value=productContainer[index].nameValue
    pPriceElement.value=productContainer[index].priceValue
    pCategoryElement.value=productContainer[index].categoryValue
    pDescriptionElement.value=productContainer[index].descriptionValue
    mainBtn.innerHTML= `<button  class= 'btn btn-warning'  onclick="updateData(${index})">Update Date </button>` 
}

function updateData(index){
    productContainer[index].nameValue=pNameElement.value;
    productContainer[index].priceValue=pPriceElement.value;
    productContainer[index].categoryValue=pCategoryElement.value;
    productContainer[index].descriptionValue=pDescriptionElement.value;




clear()
localStorage.setItem("products", JSON.stringify( productContainer ));
mainBtn.innerHTML=`<button  onclick="addProduct()" class="btn btn-info text-white">  Add product  </button>`
displayProducts(productContainer)

}

function validateProductName(){
   var regex = /^[a-z]{1}/i;
   if(regex.test(pNameElement.value))
   {return true;}
   else{alert(`Please start your product name input by a letter`)}   

}
