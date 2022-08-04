import { getElement } from "../utils.js"
import { displayAP } from "../displayProducts.js"

const setupPrice = (sneakersStore) =>{
  const priceFilter = getElement(".price-filter")
  const priceValue = getElement(".price-value")

  // Setup Price Range
  const price = sneakersStore.map(sneakers => sneakers.price)
  let maxPrice = Math.max(...price)
  maxPrice = Math.ceil(maxPrice / 100)

  let minPrice = Math.min(...price)
  minPrice = Math.floor(minPrice / 100)
  
  priceFilter.value = maxPrice
  priceFilter.max = maxPrice
  priceFilter.min = minPrice
  priceValue.textContent =  `Price : $${maxPrice.toFixed(2)}`

  priceFilter.addEventListener("input", function(e){
    const value = parseInt(priceFilter.value)
    priceValue.textContent = `Price : $${value.toFixed(2)}`
    const filteredSneakers = sneakersStore.filter(sneakers => (sneakers.price / 100) <= value)
    displayAP(filteredSneakers, getElement(".products-container"), true)
    if (filteredSneakers.length < 1) {
      const productsDOM = getElement('.products-container')
      productsDOM.innerHTML = `
     <h3 class="filter-error">
     Hey Buddy!
    <br>
    No sneakers below $${minPrice.toFixed(2)} in stock now. 
    <br>Please check back later. 
    </h3>
     `
    }
    getElement(".search-input").value = ""
  })


}

export default setupPrice