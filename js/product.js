function chargementPanier(){
    let nombreProduit = localStorage.getItem('qté'); 
    
    if(nombreProduit){
    document.querySelector ('.totalQté').textContent = nombreProduit;
    }else{
        document.querySelector ('.totalQté').textContent = 0 ;
    }
}

chargementPanier(); 

//  Retrieving the product id in the url

let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id);

let _id = id;
let teddy;
let paniers;

//  Obtaining a single product to display in the product page
let article = () => {
  let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            teddy = JSON.parse(this.responseText);
            affichageProduit();
        }
    };
    request.open("GET", "http://localhost:3000/api/teddies/" + _id);
    request.send();
};
// Display the article requested when opening the product page
window.addEventListener('load', article);

let panier = localStorage.getItem('panier');
panier = JSON.parse(panier);
localStorage.setItem('panier', JSON.stringify(panier));

 // Product display in small container
function affichageProduit() {
    
    var article = document.createElement('article');
        var image = document.createElement('img');
        image.src =  teddy.imageUrl;
        id =  teddy._id;
    var div = document.createElement('div');
        var nom = document.createElement('h3');
        nom.textContent = teddy.name;
        nom.id = "teddy";
    
        var prix = document.createElement('h4');
        prix.textContent = 'Price :';
        var price = document.createElement('p');
        price.textContent = (teddy.price/100).toFixed(2) + ' U$D';
    
        var desc = document.createElement('h4');
        desc.textContent = 'Description :';
        var description = document.createElement('p');
        description.textContent = teddy.description;

        //Button back to product list (index.html)
    var liste = document.createElement('button');
    liste.id = "liste";
    liste.textContent = "Continue shopping";
    liste.addEventListener('click', function() {
        window.location.href = "../index.html";
    });
        // button to see the cart (cart.html)
    var voirPanier = document.createElement('button');
    voirPanier.id = "voirPanier";
    voirPanier.textContent = "My cart";
    voirPanier.addEventListener('click', function(e) {
        window.location.href = "../html/cart.html";
    });

    //  Choose color
    var label = document.createElement('label');
    label.textContent = "Color : ";
    var color = document.createElement('select');
    color.id = 'choix';
    var choix = teddy.colors;
    choix.id = "couleur";

    // Creation of a for loop to display the drop-down list of Teddy colors
    for (var i = 0; i < choix.length; i++) {
    var option = document.createElement('option');
    option.textContent = choix[i];
    option.id = "couleur";
    color.appendChild(option);
    };

    // Add cart button
    ajoutPanier = document.createElement ('button');
    ajoutPanier.id = "stockage";
    ajoutPanier.textContent = "Add to cart";

    ajoutPanier.addEventListener('click', function() {
        alert('You added ' + teddy.name + ' to your cart')
        ajoutLocalStorage()
        nombreProduit()
        prixTotal()
      //Update the number of products
function nombreProduit(){  
    let nombreProduit = localStorage.getItem('qté');  
    nombreProduit = parseInt(nombreProduit);
    
    if (nombreProduit){
        localStorage.setItem("qté", nombreProduit + 1);
        document.querySelector ('.totalQté').textContent = nombreProduit + 1;
    } else{
        localStorage.setItem("qté", 1);
       document.querySelector ('.totalQté').textContent = 1;
    }
} 
//Update the number of products in the "qty:" object
function ajoutLocalStorage(){
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    teddy.qté = 0;
    
    if(panier != null){

        if(panier[teddy.name] === undefined) {
            panier = {...panier, [teddy.name] : teddy}
        }
        panier[teddy.name].qté += 1;
    } else {
        panier = {[teddy.name] : teddy}
        panier[teddy.name].qté += 1;
    }
    localStorage.setItem("panier", JSON.stringify(panier));
}
function prixTotal(){
    let price = parseInt(teddy.price);
    let prixDuPanier = JSON.parse(localStorage.getItem('prixTotal'));
    
    if(prixDuPanier != null){
        localStorage.setItem("prixTotal", prixDuPanier + price);
    } else {
        localStorage.setItem("prixTotal", price);
    }
}

})
    //Setting up elements in the DOM
 
    produit.appendChild(article);
    article.appendChild(nom);
    article.appendChild(image);
    article.appendChild(div);
    div.appendChild(prix);
    div.appendChild(price);
    div.appendChild(desc);
    div.appendChild(description);
    div.appendChild(label);
    div.appendChild(color);
    div.appendChild(ajoutPanier)
    div.appendChild(liste);
    div.appendChild(voirPanier);

};