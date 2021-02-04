function commande(){

    let data = JSON.parse(sessionStorage.getItem('order'));
    let prix = JSON.parse(sessionStorage.getItem('prix'));

    let productContainer = document.getElementById("recap");

    // Creation of the order confirmation message

    if( data != null ) {
        productContainer.innerHTML = '';
        // We retrieve the data in the order object of the order in the LocalStorage
        Object.values(data).map( () => {

            // We display the confirmation message with the recovered data
            productContainer.innerHTML = 
            `<p>Thank you for shopping with us!</p>

            <p>Your order number is : <span class="gras"> ${data.orderId}</span><br><br>
            Order Total : <span class="gras">${(prix/100).toFixed(2)} U$D</span>.
            </p>
                
            <p>We'll send a confirmation when your order ship.<br><br>
            
            <i class="fas fa-paw"></i> <i class="fas fa-paw"></i> <span class="abientot">We hope to see you again soon. </span> <i class="fas fa-paw"></i> <i class="fas fa-paw"></i></p>`   
        });    
    } 
}
// Resetting the sessionStorage thanks to the button "return to the home page of the site" and return to index.html
function retour(){

    localStorage.clear();
    sessionStorage.clear();
}
commande();