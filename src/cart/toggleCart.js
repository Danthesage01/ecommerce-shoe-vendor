import { getElement } from "../utils.js";


const toggleCartBtn = getElement(".toggle-cart")
const cartOverlay = getElement(".cart-overlay")
const closeCartBtn = getElement(".cart-close")

toggleCartBtn.addEventListener("click", ()=>{
  cartOverlay.classList.add("show")
})
closeCartBtn.addEventListener("click", ()=>{
  cartOverlay.classList.remove("show")
})


export const openCart = () =>{
  cartOverlay.classList.add("show")
}

