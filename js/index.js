
function chargementPanier(){
    let nombreProduit = localStorage.getItem('qté'); 
    
    if(nombreProduit){
    document.querySelector ('.totalQté').textContent = nombreProduit;
    }else{
        document.querySelector ('.totalQté').textContent = 0;
    }
  }

  
chargementPanier(); 
//    Connection to the API to retrieve data from the server

var teddy = function (url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr);
            // alert if the server doesn't respond
            alert("Oops! Something went wrong ! ")
          };
        };
      };
      xhr.open('GET','http://localhost:3000/api/teddies', true);
      xhr.send();
    });
  };

  // Displays an error if the AJAX request doesn't work
var catchError = function(e){
    console.error('Erreur AJAX', e);
  };
  
  //  Data recovery from the server thanks to the previous request
  var products = function () {
    return teddy('http://localhost:3000/api/teddies/').then(function (response) {
      var products = JSON.parse(response);
      return products;
    });
  };
  let ourson = document.getElementById('ourson');
  
    // Dynamically display the list of articles thanks to JS
  
    products().then(function(products){
    console.log(products);
    
  
    // forEach to display each products in a row as a list
    products.forEach( teddy=> {
    
      var article = document.createElement('article');
      article.id= "articleListe";
  
        var image = document.createElement('img');
        image.src =  teddy.imageUrl;
  
          var div = document.createElement('div');
            var nom = document.createElement('h3');
            nom.textContent = teddy.name;
            nom.id = "teddy";
  
            var prix = document.createElement('h4');
            prix.textContent = 'Price :';
              var price = document.createElement('p');
              price.textContent = (teddy.price/100).toFixed(2) + ' U$D';
              price.id = "price";
      
            var id = teddy._id;
  
            let link = document.createElement('a');
              link.id = "lien";
              link.href = './html/product.html?id=' + teddy._id;
              link.textContent = "Select Teddy";
  
  // Setting up elements for other articles displayed in a loop in the DOM
  
      ourson.appendChild(article);
      article.appendChild(nom);
      article.appendChild(image);
      article.appendChild(div);
      div.appendChild(prix);
      div.appendChild(price);
      div.appendChild(link)
    });
  });
  
  

