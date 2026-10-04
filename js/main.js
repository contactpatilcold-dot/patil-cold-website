// =========================================
// PATIL COLD WEBSITE
// Main JavaScript
// =========================================


// Mobile menu
function toggleMenu() {

    const navbar = document.querySelector(".navbar");

    navbar.classList.toggle("active");

}


// Close mobile menu after clicking a link

document.querySelectorAll(".navbar a").forEach(function(link) {

    link.addEventListener("click", function() {

        document.querySelector(".navbar").classList.remove("active");

    });

});


// Temporary product data
// This will be replaced with Supabase data
// in the next step.

const products = [

    {
        flavour: "Vanilla",
        description: "Classic and creamy vanilla ice cream.",
        price: "₹10",
        emoji: "🍦",
        className: "flavour-vanilla"
    },

    {
        flavour: "Chocolate",
        description: "Rich and smooth chocolate ice cream.",
        price: "₹10",
        emoji: "🍫",
        className: "flavour-chocolate"
    },

    {
        flavour: "Butterscotch",
        description: "Creamy butterscotch with caramel flavour.",
        price: "₹10",
        emoji: "🍨",
        className: "flavour-butterscotch"
    },

    {
        flavour: "Mango",
        description: "Refreshing and fruity mango ice cream.",
        price: "₹10",
        emoji: "🥭",
        className: "flavour-mango"
    },

    {
        flavour: "Strawberry",
        description: "Fruity and creamy strawberry ice cream.",
        price: "₹10",
        emoji: "🍓",
        className: "flavour-strawberry"
    }

];


function displayProducts() {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";


    products.forEach(function(product) {

        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image ${product.className}">

                <div class="product-placeholder">
                    ${product.emoji}
                </div>

            </div>

            <div class="product-info">

                <h3>
                    ${product.flavour}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="price">
                    From ${product.price}
                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });

}


displayProducts();
