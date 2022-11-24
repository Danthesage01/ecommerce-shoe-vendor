import { formatPrice } from "./utils.js"
import { addToCart } from "./cart/setupCart.js"

const displayFP = (products, element, filters) => {
  element.innerHTML = products.map(product => {
    console.log(product, "displayProducts.js");
    const { id, name, brand, url, price } = product
    return `
        <article class="product">
          <div class="product-container">
            <img src="${url}" class="product-img img" alt="${name}" />
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name"> <span class="product-brand">${brand}</span> - ${formatPrice(price)}</p>
          </footer>
        </article>
    `
  }).join("")
  if (filters) return
  element.addEventListener("click", function(e){
    const parent = e.target.parentElement
    if (parent.classList.contains("product-cart-btn")){

      // const parseID = parseInt(parent.dataset.id)
      // addToCart(parseID)
    
      addToCart(parent.dataset.id)
    }
  })
}

const displayAP = (products, element, filters) => {
  element.innerHTML = products.map(product => {
    const { id, name, url, price } = product
    return `
        <article class="product">
          <div class="product-container">
            <img src="${url}" class="product-img img" alt="${name}" />
            <div class="product-icons">
              <a href="product.html?id=${id}" class="product-icon">
                <i class="fas fa-search"></i>
              </a>
              <button class="product-cart-btn product-icon" data-id="${id}">
                <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          </div>
          <footer>
            <p class="product-name"> <span class="product-brand"> ${name}</p>
            <h4 class="product-price">${formatPrice(price)}</h4>
          </footer>
        </article>
    `
  }).join("")
  if (filters) return
  element.addEventListener("click", function (e) {
    const parent = e.target.parentElement
    if (parent.classList.contains("product-cart-btn")) {
          addToCart(parent.dataset.id)
      // const parseID = parseInt(parent.dataset.id)
      // addToCart(parseID)
    }
  })
}

export {displayFP, displayAP}