// =========================================
// PATIL COLD WEBSITE
// Supabase Product Loading
// =========================================


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


// =========================================
// LOAD PRODUCTS FROM SUPABASE
// =========================================

async function loadProducts() {

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = `
        <div class="loading">
            Loading our delicious flavours...
        </div>
    `;


    try {

        const { data, error } = await supabaseClient
            .from("products")
            .select("*")
            .eq("available", true)
            .order("sort_order", { ascending: true });


        if (error) {

            console.error("Supabase error:", error);

            productGrid.innerHTML = `
                <div class="loading">
                    <h3>Product Loading Error</h3>
                    <p>${error.message}</p>
                    <p>Error Code: ${error.code || "N/A"}</p>
                </div>
            `;

            return;
        }


        if (!data || data.length === 0) {

            productGrid.innerHTML = `
                <div class="loading">
                    No products available currently.
                </div>
            `;

            return;
        }


        // Group products by flavour

        const flavours = {};

        data.forEach(function(product) {

            if (!flavours[product.flavour]) {

                flavours[product.flavour] = [];

            }

            flavours[product.flavour].push(product);

        });


        productGrid.innerHTML = "";


        Object.keys(flavours).forEach(function(flavour) {

            const products = flavours[flavour];

            const firstProduct = products[0];

            const flavourClass = getFlavourClass(flavour);

            const emoji = getFlavourEmoji(flavour);

            const imagePath = getFlavourImage(flavour);

            const lowestPrice = Math.min(
                ...products.map(product => Number(product.price))
            );


            const sizes = products
                .map(product => `${product.size} - ₹${product.price}`)
                .join(" | ");


            // =========================================
            // CREATE CLICKABLE FLAVOUR CARD
            // =========================================

            const card = document.createElement("a");

            card.className = "product-card";

            card.href =
                "products.html?flavour=" +
                encodeURIComponent(flavour);

            card.style.cursor = "pointer";

            card.style.textDecoration = "none";

            card.style.color = "inherit";


            // =========================================
            // CARD CONTENT
            // =========================================

            card.innerHTML = `

                <div class="product-image ${flavourClass}">

                    <img
                        src="${firstProduct.image_url || imagePath}"
                        alt="Patil Cold ${flavour} Ice Cream"
                        loading="lazy"
                    >

                </div>


                <div class="product-info">

                    <h3>
                        ${flavour}
                    </h3>

                    <p>
                        ${firstProduct.description || "Delicious and creamy ice cream."}
                    </p>

                    <div class="price">
                        From ₹${lowestPrice}
                    </div>

                    <p>
                        ${sizes}
                    </p>

                </div>

            `;


            productGrid.appendChild(card);

        });


    } catch (error) {

        console.error(error);

        productGrid.innerHTML = `
            <div class="loading">
                Something went wrong while loading products.
            </div>
        `;

    }

}


// =========================================
// FLAVOUR STYLE
// =========================================

function getFlavourClass(flavour) {

    const name = flavour.toLowerCase();


    if (name.includes("vanilla")) {
        return "flavour-vanilla";
    }

    if (name.includes("chocolate")) {
        return "flavour-chocolate";
    }

    if (name.includes("butterscotch")) {
        return "flavour-butterscotch";
    }

    if (name.includes("mango")) {
        return "flavour-mango";
    }

    if (name.includes("strawberry")) {
        return "flavour-strawberry";
    }


    return "flavour-vanilla";

}


// =========================================
// FLAVOUR EMOJI
// =========================================

function getFlavourEmoji(flavour) {

    const name = flavour.toLowerCase();


    if (name.includes("vanilla")) {
        return "🍦";
    }

    if (name.includes("chocolate")) {
        return "🍫";
    }

    if (name.includes("butterscotch")) {
        return "🍨";
    }

    if (name.includes("mango")) {
        return "🥭";
    }

    if (name.includes("strawberry")) {
        return "🍓";
    }


    return "🍦";

}


// =========================================
// FLAVOUR IMAGE
// =========================================

function getFlavourImage(flavour) {

    const name = flavour.toLowerCase();


    if (name.includes("vanilla")) {
        return "assets/products/vanilla.png";
    }

    if (name.includes("chocolate")) {
        return "assets/products/chocolate.png";
    }

    if (name.includes("butterscotch")) {
        return "assets/products/butterscotch.png";
    }

    if (name.includes("mango")) {
        return "assets/products/mango.png";
    }

    if (name.includes("strawberry")) {
        return "assets/products/strawberry.png";
    }


    return "";

}


// =========================================
// START
// =========================================

loadProducts();
