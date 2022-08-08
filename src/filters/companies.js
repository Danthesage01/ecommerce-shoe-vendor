import { getElement } from "../utils.js"
import { displayAP } from "../displayProducts.js"

const setupCompanies = (sneakersStore) => {
  const brands = sneakersStore.reduce((values, item) => {
    const { brand } = item
    if (!values.includes(brand)) {
      values.push(brand)
    }
    return values
  }, ["All"])
  const brandsDOM = getElement(".companies")

 
  brandsDOM.innerHTML = brands.map((brand, index)=>{
    return `<button class="company-btn">${brand}</button>`
  }).join("")
  brandsDOM.addEventListener("click", function(e){
    const element = e.target
    if (element.classList.contains("company-btn")){
      let filteredSneakers = []
      if(element.textContent === "All"){
        filteredSneakers = [...sneakersStore]
      }
      else{
        filteredSneakers = sneakersStore.filter(sneakers=> sneakers.brand === element.textContent)
      }
      displayAP(filteredSneakers, getElement(".products-container"), true)
    }
    getElement(".search-input").value = ""
  })

}

export default setupCompanies