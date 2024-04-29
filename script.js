// Get DOM elements
const allCategoryButton = document.getElementById("allCategoryButton");
const menButton = document.getElementById("menButton");
const womenButton = document.getElementById("womenButton");
const kidsButton = document.getElementById("kidsButton");
const section = document.querySelector('.items-list');

// Data initialization
let data = null;

// Fetch data from API
async function fetchDataFromAPI() {
    const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    data = await response.json();
}

// Print card data for a given category index
async function printCardData(index) {
    if (!data) await fetchDataFromAPI();

    // Get the category data
    const category = data.categories[index];

    // Clear existing content
    section.innerHTML = '';

    // Print each product in the category
    category.category_products.forEach((item) => {
        const compareAtPrice = Number(item.compare_at_price);
        const price = Number(item.price);
        const discount = Math.floor(((compareAtPrice - price) / compareAtPrice) * 100);
        const itemData = `
            <div class="img-container" style="background-image: url('${item.image}');">
                ${item.badge_text ? `<div id="badge_text">${item.badge_text}</div>` : ""}
            </div>
            <div class="information-container">
                <p>
                    <span id="title-cloth">${item.title}</span>
                    <span>&#x2022;</span>
                    <span id="vendor">${item.vendor}</span>
                </p>
                <p style="margin-top: -5px">
                    <span id="discounted-price">Rs. ${item.price}</span>
                    <span id="original-price">Rs. ${item.compare_at_price}</span>
                    <span id="discount">${discount}% Off</span>
                </p>
            </div>
            <div class="cart-container">
                <button>Add to Cart</button>
            </div>
        `;
        const newItem = document.createElement('div');
        newItem.classList.add('item');
        newItem.innerHTML = itemData;
        section.appendChild(newItem);
    });
}

// Event listener for category buttons
function handleCategoryButtonClick(index) {
    // Remove 'active' class from all buttons
    allCategoryButton.classList.remove('active');
    menButton.classList.remove('active');
    womenButton.classList.remove('active');
    kidsButton.classList.remove('active');

    // Add 'active' class to the clicked button
    switch (index) {
        case 0:
            allCategoryButton.classList.add('active');
            printAllCategoriesData(); // Print all categories
            break;
        case 1:
            menButton.classList.add('active');
            printCardData(0); // Print Men category
            break;
        case 2:
            womenButton.classList.add('active');
            printCardData(1); // Print Women category
            break;
        case 3:
            kidsButton.classList.add('active');
            printCardData(2); // Print Kids category
            break;
        default:
            break;
    }
}

// Print all categories data
async function printAllCategoriesData() {
    if (!data) await fetchDataFromAPI();

    // Clear existing content
    section.innerHTML = '';

    // Loop through all categories and print data
    for (let i = 0; i < data.categories.length; i++) {
        const category = data.categories[i];
        category.category_products.forEach((item) => {
            const compareAtPrice = Number(item.compare_at_price);
            const price = Number(item.price);
            const discount = Math.floor(((compareAtPrice - price) / compareAtPrice) * 100);
            const itemData = `
                <div class="img-container" style="background-image: url('${item.image}');">
                    ${item.badge_text ? `<div id="badge_text">${item.badge_text}</div>` : ""}
                </div>
                <div class="information-container">
                    <p>
                        <span id="title-cloth">${item.title}</span>
                        <span>&#x2022;</span>
                        <span id="vendor">${item.vendor}</span>
                    </p>
                    <p style="margin-top: -5px">
                        <span id="discounted-price">Rs. ${item.price}</span>
                        <span id="original-price">Rs. ${item.compare_at_price}</span>
                        <span id="discount">${discount}% Off</span>
                    </p>
                </div>
                <div class="cart-container">
                    <button>Add to Cart</button>
                </div>
            `;
            const newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.innerHTML = itemData;
            section.appendChild(newItem);
        });
    }
}

// Event listeners for category buttons
allCategoryButton.addEventListener('click', () => handleCategoryButtonClick(0));
menButton.addEventListener('click', () => handleCategoryButtonClick(1));
womenButton.addEventListener('click', () => handleCategoryButtonClick(2));
kidsButton.addEventListener('click', () => handleCategoryButtonClick(3));

// Initialize the page
window.addEventListener('load', async () => {
    await fetchDataFromAPI();
    handleCategoryButtonClick(0); // Show all categories by default
});