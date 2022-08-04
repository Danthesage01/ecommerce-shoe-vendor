import { getElement } from "../utils.js"
import { displayAP } from "../displayProducts.js"

const formInput = getElement(".input-form")
const searchInput = getElement(".search-input")

const setupSearch = (sneakersStore) => {

  formInput.addEventListener("keyup", function () {
    const searchValue = searchInput.value
    if (searchValue) {
      const filteredSneakers = sneakersStore.filter(product => {
        let { name, brand } = product
        name = name.toLowerCase()
        brand = brand.toLowerCase()
        if (name.includes(searchValue) || brand.includes(searchValue)) {
          return product
        }
      })
      displayAP(filteredSneakers, getElement('.products-container'), true)
      if (filteredSneakers.length < 1) {
        const productsDOM = getElement('.products-container')
        productsDOM.innerHTML = `
              <h3 class="filter-error">
              Hey Buddy!
              <br>
                No sneakers with such a name or brand in stock.
                <br> 
                Please check back later. 
              </h3>
     `
      }
    }
    else {
      displayAP(sneakersStore, getElement('.products-container'))
    }
  })

}

export default setupSearch