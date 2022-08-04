import { getElement } from "../utils.js"
import { displayAP } from "../displayProducts.js"


const setupGender = (sneakersStore) =>{
let gender = sneakersStore.map(sneaker=>sneaker.gender)
gender = ["All", ...new Set(gender)].sort()

const genderDOM = getElement(".gender")
genderDOM.innerHTML = gender.map(gender =>{
  return `
  <button class="gender-btn">${gender}</button>
  `
}).join("")

genderDOM.addEventListener("click", function(e){
  const element = e.target
  if (element.classList.contains("gender-btn")){
    let filteredSneakers = []
    if(element.textContent === "All"){
        filteredSneakers = [...sneakersStore]
    }
    else{
      filteredSneakers = sneakersStore.filter(sneaker => sneaker.gender === element.textContent)
    }
    displayAP(filteredSneakers, getElement(".products-container"), true)
  }
  getElement(".search-input").value = ""
})


}

export default setupGender