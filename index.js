// Global Imports
import "./src/toggleSidebar.js";
import "./src/cart/toggleCart.js";
import "./src/cart/setupCart.js";

// Specific Imports
import fetchProducts from "./src/fetchProducts.js"
import {displayFP} from "./src/displayProducts.js"
import { setupStore, sneakersStore } from "./src/store.js"
import { getElement, scrollToTop } from "./src/utils.js"

const init = async() =>{
const products = await fetchProducts()
console.log(products, "index.js")
setupStore(products)
const featured = sneakersStore.filter(product=> product.featured === true )
console.log(featured);

displayFP(featured, getElement(".featured-center"))
}

window.addEventListener("DOMContentLoaded", init)



scrollToTop()