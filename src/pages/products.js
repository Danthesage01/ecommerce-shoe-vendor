// Global Imports
import "../toggleSidebar.js"
import "../cart/toggleCart.js"
import "../cart/setupCart.js"

// Filter Imports
import setupGender from "../filters/gender.js"
import setupCompanies from "../filters/companies.js"
import setupSearch from "../filters/search.js"
import setupPrice from "../filters/price.js"

// Specific Imports
import { getElement, scrollToTop } from "../utils.js"
import { displayAP } from "../displayProducts.js"
import { sneakersStore, setupStore } from "../store.js"


// Fetch Imports
import fetchProducts from "../fetchProducts.js"

const init = async () => {
  const loading = getElement(".loading")
  if(sneakersStore.length < 1){
    const products = await fetchProducts()
    setupStore(products)
  }
  displayAP(sneakersStore, getElement(".products-container"))
  setupSearch(sneakersStore)
  setupCompanies(sneakersStore)
  setupGender(sneakersStore)
  setupPrice(sneakersStore)
  loading.style.display = "none"
}
init()

scrollToTop()

// const topScroll = getElement(".top-link")
// window.addEventListener("scroll", ()=>{
//   const scrollHeight = window.pageYOffset
//   if(scrollHeight > 500){
//     topScroll.classList.add("show-toplink")
//   }else{
//     topScroll.classList.remove("show-toplink")
//   }
// })

// topScroll.addEventListener("click", e=>{
//   e.preventDefault()
//   const id = e.target.getAttribute("href")
//   const element = getElement(id)
//   let position = element.offsetTop - 62
//   window.scrollTo({
//     left: 0,
//     top: position,
//     behavior: "smooth"
//   })
// })
