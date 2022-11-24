// Global Imports
import "../toggleSidebar.js"
import "../cart/toggleCart.js"
import "../cart/setupCart.js"

// Specific Imports
import { addToCart } from "../cart/setupCart.js"
import { URL, SPURL, getElement, formatPrice, scrollToTop } from "../utils.js"


// selections of items
// const loading = getElement(".page-loading")
const loading = getElement(".sp-loading")
const centerDOM = getElement(".single-product-center")
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement(".single-product-img")
const nameDOM = getElement(".single-product-title")
const genderDOM = getElement(".single-product-gender")
const brandDOM = getElement(".single-product-brand")
const priceDOM = getElement(".single-product-price")
const colorDOM = getElement(".single-product-colors")
const descriptionDOM = getElement(".single-product-desc")
const cartBtn = getElement('.addToCartBtn');

let sneakersID
window.addEventListener("DOMContentLoaded", async () => {
  const urlID = window.location.search
  const params = new URLSearchParams(urlID)
  const ID = params.get("id")

  try {
    const res = await fetch(`${SPURL}${ID}`)
    if (res.ok === true && res.status === 200) {
      const sneakers = await res.json()
      const { id } = sneakers
      const { brand, colors, description, name, gender, price, images } = sneakers.fields

      sneakersID = id

      pageTitleDOM.textContent = `/ ${name}`
      document.title = `${name}`
      imgDOM.alt = `${name}`
      imgDOM.src = images[0].url
      nameDOM.textContent = name
      brandDOM.textContent = `by ${brand}`
      priceDOM.textContent = formatPrice(price)
      genderDOM.textContent = gender
      descriptionDOM.textContent = `${description}.`
      colors.forEach(color=> {
        const span = document.createElement("span")
        span.classList.add("product-color")
        span.style.backgroundColor = color
        colorDOM.append(span)
      })
  
      
    }
    else {
      centerDOM.innerHTML = `
      <div>
      <h3 class="filter-error">
      Sorry, something went wrong
      </h3>
      <a href="index.html" class="btn">Back Home</a>
      </div>`

    }
  } catch (error) {
    console.log(error)
  }
  loading.style.display = "none"
})

cartBtn.addEventListener("click", function(){
  addToCart(sneakersID)
})



scrollToTop()