function chargementPanier(){
    let nombreProduit = localStorage.getItem('qté'); 
    
    if(nombreProduit){
    document.querySelector ('.totalQté').textContent = nombreProduit;
    }else{
        document.querySelector ('.totalQté').textContent = 0 ;
    }
  }
  
  chargementPanier(); 
  
  //    Display of carted items in the cart page
  function affichagePanier(){
  
    let data = JSON.parse(localStorage.getItem('panier'));
  
  
  // Save the values ​​of the total price in a variable
    var total = localStorage.getItem('prixTotal');
    var prixPanier = document.getElementById('total');
  
  // Display of the total price of the basket if the basket contains something ... Otherwise it displays "your basket is empty"
    if (total != null) {
      prixPanier.textContent = 'Payment total : ' + (parseFloat(total/100)).toFixed(2) +  ' U$D';
      prixPanier.id = 'prixTotal'; 
    } else  {
      prixPanier.textContent = 'Le montant de votre commande est de : 0 U$D';
    }
  
  // Display of products in the basket in the form of small item sheets
    let productContainer = document.getElementById("basket");
  
    if( data == null || total == 0 ) {
      var div = document.createElement('div');
      div.textContent = " your cart is empty ";
      basket.appendChild(div);
    } else {
      productContainer.innerHTML = '';
      // We retrieve the values ​​in the localStorage to display them in the form of a small container for the basket
      Object.values(data).map( (teddy) => {
      
        var article = document.createElement('article');
        article.id = "articlePanier";
        var nom = document.createElement('h2');
        nom.textContent = teddy.name;
        var image = document.createElement('img');
        image.src =  teddy.imageUrl;
        var div = document.createElement('div');
        div.id = "produit";
        var quantite = document.createElement('h3');
        quantite.textContent = 'Quantity: ';
        var qté = document.createElement('p');
        qté.textContent =  teddy.qté;
        var prix = document.createElement('h3');
        prix.textContent = 'Price: '; 
        var price = document.createElement('p');
        price.textContent = (teddy.price/100).toFixed(2) +  ' U$D';
        price.id = "price";  
        var supprime = document.createElement('button');
        supprime.textContent = "Delete item";
        supprime.id = "supprime";
                 
        // Setting up elements in the DOM
      
        basket.appendChild(article);  
        article.appendChild(nom);                   
        article.appendChild(image);
        article.appendChild(div);         
        div.appendChild(quantite);
        div.appendChild(qté);
        div.appendChild(prix);
        div.appendChild(price);
        div.appendChild(supprime);
      }); 
    }; 
    // We call the function "delete the product" in the container of the article in the basket
  deleteButtons();
  };
  // We call the function "cart display" to display the products in the cart
  affichagePanier();
  
  //  Delete an Item
  function deleteButtons() {  
    let deleteButtons = document.querySelectorAll('#supprime');
    let nomProduit ;
    let nombreTotalDeProduit = localStorage.getItem('qté');
    nombreTotalDeProduit = parseInt(nombreTotalDeProduit);
    let coutDuPanier = localStorage.getItem("prixTotal");
    coutDuPanier = parseInt(coutDuPanier);
    let data = JSON.parse(localStorage.getItem('panier'));
  
  // We do a For loop to display the "delete products" buttons as many times as there is an item in the cart
    
  for(let i=0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', () => {
        // Recover of the name of the teddy for later
        nomProduit = deleteButtons[i].parentElement.parentElement.firstChild.innerText.trim();
        console.log(nomProduit);
        // Recovery of the teddy qty for removal calculations
        qté = deleteButtons[i].parentElement.children[1].textContent;
        // Convert string to number
        qté = parseInt(qté);
        // Recovery of the price of the teddy for removal calculations
        let price = deleteButtons[i].parentElement.children[3].textContent;
         // Convert string to number
        price = parseInt(price);
        //Calculation of the qty in the basket after deleting the item
        calculQte = nombreTotalDeProduit - qté;
        localStorage.setItem('qté', calculQte);
        // Price calculation in the basket after deleting the article
        calculPrice = coutDuPanier - qté * price*100;
        localStorage.setItem('prixTotal', calculPrice);
        // We delete the line of the teddy corresponding to the delete button
        delete data[nomProduit];
  
        // Alert to say that an article has been deleted.
        alert('Vous avez supprimé '+ nomProduit + ' de votre panier ! ')
        // We refresh the LocalStorage and reload the page for an update
        localStorage.setItem('panier', JSON.stringify(data));
        window.location.reload();
      
        affichagePanier();
        chargementPanier(); 
       });
      }; 
  };
  
  //  Final order request containing contact information and product IDs
  var formValid = document.getElementById('valider');
  formValid.addEventListener ('click', achat);
  
  function achat() {
  
  // Integration of an alert if the basket is empty, we cannot order  
    let panier = localStorage.getItem('panier');
    panier = JSON.parse(panier);
    var total = localStorage.getItem('prixTotal');
  if (panier == null || total == 0){
    alert("Your cart is empty, you cannot place an order ! ")
   }  
  // We declare an array of products for the POST request later
   let products = [];
  
   // We do a function to retrieve the id of the products in the cart, to display it in the POST request
   function productId(products) {
    let panier = JSON.parse(localStorage.getItem('panier'));
    
    products = Object.values(panier).map( (data) => {
      let qté = parseInt(data.qté);
      console.log(typeof qté);
      console.log(qté);
      
      for (let i = 0 ; i< qté ; i ++){
          products.push(data._id);  
        }
         console.log(products); 
        return products; 
       });
   
    };
    productId(products);
    
      // Retrieve the value of the fields entered by the customer
       
      let firstName = document.getElementById('firstname').value;
      let lastName = document.getElementById('name').value;
      let email = document.getElementById('email').value;
      let address = document.getElementById('address').value;
      let city = document.getElementById('city').value;
  
    // We put the values ​​in an object for the POST request
    
      let contact = {
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "address": address,
          "city": city,
      };
  
  // Creation of the mandatory object for the request to send to the server
    let objt = {
      contact,
      products
    };
  
    let achat = JSON.stringify(objt);
   // console.log(achat);
   // console.log(products);
    
    //Display an alert if information is missing and save the data in the localStorage
    var prenom = document.getElementById('firstname');
    var oublisPrenom = document.getElementById('oublisPrenom');
    var prenomValid = /^[a-zA-Z ,.'-]+$/;
  
    var nom = document.getElementById('name');
    var oublisNom = document.getElementById('oublisNom');
    var nomValid = /^[a-zA-Z ,.'-]+$/;
  
    var mail = document.getElementById('email');
    var oublisEmail = document.getElementById('oublisEmail');
    var mailValid = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;
  
    var adresse = document.getElementById('address');
    var oublisAdress = document.getElementById('oublisAdress');
    var adresseValid = /[0-9a-zA-Z]{1,3}[a-z ,.'-]+$/;
  
    var ville = document.getElementById('city');
    var oublisVille = document.getElementById('oublisVille');
    var villeValid = /^^[a-zA-Z ,.'-´]+$/;
  
    if (prenomValid.test(prenom.value) == false){
      oublisPrenom.textContent = "Incorrect first name format";
      oublisPrenom.style.color = 'red';
      return event.preventDefault();
  
    } else if (nomValid.test(nom.value) == false){
      oublisNom.textContent = "Incorrect last name format";
      oublisNom.style.color = 'red';
      return event.preventDefault();
  
    } else if (mailValid.test(mail.value) == false){
      oublisEmail.textContent = "Incorrect email format";
      oublisEmail.style.color = 'red';
      return event.preventDefault();
  
    } else if (adresseValid.test(adresse.value) == false){
      oublisAdress.textContent = "Incorrect address format";
      oublisAdress.style.color = 'red';
      return event.preventDefault();
  
    } else if (villeValid.test(ville.value) == false){
      oublisVille.textContent = "Incorrect city format";
      oublisVille.style.color = 'red';
      return event.preventDefault();
  
    } else if (panier == null || total == 0){
      return event.preventDefault();
   
    } else {
    // If everything was well filled, we send the order to the server, with all the customer's contact details
    let request = new XMLHttpRequest();
         request.onreadystatechange = function () {
           if (this.readyState == XMLHttpRequest.DONE) {
             let confirmation = JSON.parse(this.responseText);
             sessionStorage.setItem('order', JSON.stringify(confirmation));
             let prix = JSON.parse(localStorage.getItem('prixTotal'));
             sessionStorage.setItem('prix', JSON.stringify(prix));
            console.log(typeof prix);
            console.log( prix);
            // As soon as the request is sent, we go to the order confirmation page with all the information requested: Order ID, basket price
             window.location.href = "confirmation.html";
           }
         };
    request.open("post", "http://localhost:3000/api/teddies/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(achat);
  } 
  
  }
