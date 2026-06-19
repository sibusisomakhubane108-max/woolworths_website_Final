// 1. Unified Master Product Inventory
const products = [
    // CAKES CATEGORY
    { name: "Golden Crumb patisserie", price: "R1999,99", image: "images/Gallery/full/patisserie.avif", category: "cakes" },
    { name: "Ivory Whisk", price: "R1900,99", image: "images/Gallery/full/103356.avif", category: "cakes" },
    { name: "The Gilded Cake", price: "R499,99", image: "images/Gallery/full/cake.jpg", category: "cakes" },
    { name: "Caramel Swiss Roll", price: "R149,99", image: "images/Gallery/full/Caramel_Swiss_Roll.png", category: "cakes" },
    { name: "Vanilla Caramel Sponge Cake", price: "R193,99", image: "images/Gallery/full/Vanilla_Caramel_Sponge_Cake.png", category: "cakes" },

    // MEN'S CLOTHING CATEGORY
    { name: "WoolworthsPants", price: "R399,99", image: "images/Gallery/full/clothing.webp", category: "men" },
    { name: "WoolworthsShorts", price: "R299,99", image: "images/Gallery/full/clothing 2.webp", category: "men" },
    { name: "Shorts", price: "R399,99", image: "images/Gallery/full/clothing.jpg", category: "men" },
    { name: "Woolworths Polo Top", price: "R299,99", image: "images/Gallery/full/POLO_TOP.png", category: "men" },
    { name: "Woolworths Melton coat", price: "R199,99", image: "images/Gallery/full/Melton_coat.png", category: "men" },

    // WOMEN'S CLOTHING CATEGORY
    { name: "Woolworths Sweatshirt", price: "R899,99", image: "images/Gallery/full/Sweart_shirt.png", category: "women" },
    { name: "Woolworths Cornelli wool blend cardigan", price: "R599,99", image: "images/Gallery/full/Cornelli_Wool_Blend_Cardigan.png", category: "women" },
    { name: "Woolworths Ribbed Pleated Satin Midi Dress", price: "R5999,99", image: "images/Gallery/full/Ribbed_Pleated_Satin_Midi_Dress.png", category: "women" },
    { name: "Woolworths Black Rib_Combo Bubble Dress", price: "R169.99", image: "images/Gallery/full/Black_Rib_Combo_Bubble Dress.png", category: "women" },
    { name: "Woolworths puffer jacket", price: "R159.99", image: "images/Gallery/full/Puffer_Jacket.png", category: "women" }
];

// Helper Function: Generates the HTML layout structural row
function buildOriginalTable(categoryItems) {
    if (categoryItems.length === 0) {
        return "<p style='color: #aaa; font-style: italic; padding: 20px;'>No matching items found in this section.</p>";
    }

    let tableHTML = '<table border="0" cellpadding="5" cellspacing="0" style="margin: 0 auto;"><tr>';
    
   categoryItems.forEach(product => {
        tableHTML += `
            <td align="center" style="vertical-align: top;">
                <div class="images">
                    <a href="${product.image}" data-lightbox="mygallery" data-title="${product.name}">
                        <img src="${product.image}" alt="${product.name}" loading="lazy"><br>
                    </a>
                    <br>${product.name} <br><span class="price">(PRICE :${product.price})</span>
                </div>
            </td>
        `;
    });

    tableHTML += '</tr></table>';
    return tableHTML;
}

// 2. Render Engine Controller
function displayProducts(productsToRender) {
    const cakeItems = productsToRender.filter(item => item.category === "cakes");
    const menItems = productsToRender.filter(item => item.category === "men");
    const womenItems = productsToRender.filter(item => item.category === "women");

    // Inject generated HTML tables into matching placeholder structural layout containers
    if(document.getElementById('cakes-table-container')) {
        document.getElementById('cakes-table-container').innerHTML = buildOriginalTable(cakeItems);
    }
    if(document.getElementById('men-table-container')) {
        document.getElementById('men-table-container').innerHTML = buildOriginalTable(menItems);
    }
    if(document.getElementById('women-table-container')) {
        document.getElementById('women-table-container').innerHTML = buildOriginalTable(womenItems);
    }

    // Refresh Lightbox initialization target rules over freshly rendered items
    if (window.lightbox) {
        lightbox.init();
    }
}

// 3. Dom Entry Initialization Loop
document.addEventListener("DOMContentLoaded", function() {
    // Safe place for Lightbox configuration rules
    if (window.lightbox) {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'fadeDuration': 300
        });
    }

    // Load initial item dataset dynamically
    displayProducts(products);

    // Bind event query filtering sequences
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const queryText = e.target.value.toLowerCase();

            // CRITICAL FIX: Evaluates BOTH the name and category fields, plus general terms
            const matchedItems = products.filter(product => {
                const matchesName = product.name.toLowerCase().includes(queryText);
                const matchesCategory = product.category.toLowerCase().includes(queryText);
                
                // This lets users type "clothes" or "clothing" to show all clothing items
                const searchesForClothing = (queryText === "cloth" || queryText === "clothes" || queryText === "clothing") && 
                                            (product.category === "men" || product.category === "women");

                return matchesName || matchesCategory || searchesForClothing;
            });

            displayProducts(matchedItems);
        });
    }
    // 4. ENQUIRY FORM VALIDATION (Existing)
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // (Keep your existing form logic here)
            alert("Form validation Thank you for enquiring stay safe");
        });
    }

});

