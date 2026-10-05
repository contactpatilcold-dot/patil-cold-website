// =========================================
// PATIL COLD WEBSITE
// Fixed 5-Flavour Homepage
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
// FIXED HOMEPAGE FLAVOURS
// =========================================
//
// These 5 cards are permanent.
// Admin changes only the products inside each flavour.
// Adding/editing/deleting a product will NOT remove,
// rename, or replace the homepage flavour card.
//

const HOME_FLAVOURS = [

    {
        name: "Vanilla",
        description: "Classic creamy vanilla ice cream loved by every generation."
    },

    {
        name: "Chocolate",
        description: "Rich and smooth chocolate ice cream for every chocolate lover."
    },

    {
        name: "Butterscotch",
        description: "Creamy butterscotch with a delicious caramel-inspired taste."
    },

    {
        name: "Mango",
        description: "Refreshing and fruity mango ice cream with a delicious summer taste."
    },

    {
        name: "Strawberry",
        description: "Fruity, creamy and refreshing strawberry ice cream for everyone."
    }

];


// =========================================
// LOAD PRODUCTS FROM SUPABASE
// =========================================

async function loadProducts() {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = `
        <div class="loading">
            Loading our delicious flavours...
        </div>
    `;


    try {

        // Get available products from Supabase.
        // This data is used only for product availability.
        // Homepage flavour cards are NOT created from this data.

        const { data, error } = await supabaseClient
            .from("products")
            .select("*")
            .eq("available", true)
            .order("sort_order", { ascending: true });


        if (error) {

            console.error("Supabase error:", error);

            // Still show all 5 permanent flavour cards.
            renderHomepageFlavours([]);

            return;

        }


        renderHomepageFlavours(data || []);


    } catch (error) {

        console.error(error);

        // Still show all 5 permanent flavour cards.
        renderHomepageFlavours([]);

    }

}


// =========================================
// RENDER FIXED HOMEPAGE FLAVOUR CARDS
// =========================================

function renderHomepageFlavours(products) {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = "";


    HOME_FLAVOURS.forEach(function(flavourInfo) {

        const flavour = flavourInfo.name;

        const flavourClass =
            getFlavourClass(flavour);

        const imagePath =
            getFlavourImage(flavour);


        // Find available products for this flavour.
        // This does NOT control whether the homepage
        // flavour card exists.

        const flavourProducts =
            products.filter(function(product) {

                return String(product.flavour || "").toLowerCase() ===
                    flavour.toLowerCase();

            });


        // =========================================
        // CREATE PERMANENT FLAVOUR CARD
        // =========================================

        const card =
            document.createElement("a");


        card.className =
            "product-card";


        card.href =
            "products.html?flavour=" +
            encodeURIComponent(flavour);


        card.style.cursor =
            "pointer";


        card.style.textDecoration =
            "none";


        card.style.color =
            "inherit";


        // =========================================
        // CARD CONTENT
        // =========================================

        card.innerHTML = `

            <div class="product-image ${flavourClass}">

                <img
                    src="${imagePath}"
                    alt="Patil Cold ${flavour} Ice Cream"
                    loading="lazy"
                    onerror="this.onerror=null; this.style.display='none';"
                >

            </div>


            <div class="product-info">

                <h3>
                    ${escapeHtml(flavour)}
                </h3>


                <p>
                    ${escapeHtml(flavourInfo.description)}
                </p>


                <span class="view-products">
                    View Products →
                </span>

            </div>

        `;


        // Accessibility information.

        if (flavourProducts.length === 0) {

            card.setAttribute(
                "aria-label",
                `${flavour} products - currently unavailable`
            );

        } else {

            card.setAttribute(
                "aria-label",
                `View ${flavour} ice cream products`
            );

        }


        productGrid.appendChild(card);

    });

}


// =========================================
// HTML ESCAPE
// =========================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// =========================================
// FLAVOUR STYLE
// =========================================

function getFlavourClass(flavour) {

    const name =
        flavour.toLowerCase();


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

    const name =
        flavour.toLowerCase();


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

    const name =
        flavour.toLowerCase();


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
// START WEBSITE
// =========================================

loadProducts();
