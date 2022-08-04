import { getElement, formatPrice, getStorageItem, setStorageItem } from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";

const cartItemCountDOM = getElement(".cart-item-count")
const cartItemsDOM = getElement(".cart-items")
const cartTotalDOM = getElement(".cart-total")

// setting up a cart for our sneakers that gets that from LS
let sneakersCart = getStorageItem("sneakersCart")

/* 
addToCart function takes in an id - where we have already in the id argument when we were displaying the products through the dataset.id (data-id) we attached to the HTML structure of each product.

addToCart Function - Opencart once the cart button on every element is clicked.
*/

export const addToCart = (id) => {
  // Find operation to get item whose id equals to the id being added to the cart
  let item = sneakersCart.find(cartItem => cartItem.id == id)
  //  checking if the item is not yet in the cart 
  if (!item) {
    //  invoking and settin the findProduct to variable product
    let product = findProduct(id)
    //  Adding amount to the found product while preserving the other data in the particular sneaker object
    product = { ...product, amount: 1 }
    //  Adding new product to the cart while preserving the other products in the cart that are coming from LS
    sneakersCart = [...sneakersCart, product]
    // Add item to the DOM
    addToCartDOM(product)
  }
  else {
    // Update the cart
    const amount = increaseAmount(id)
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")]
    const newAmount = items.find(value => value.dataset.id == id)
    newAmount.textContent = amount
  }

  //  add one to the item count
  displayCartItemCount()
  // display cart totals
  displayCartTotal()
  // set sneakersCart in local storage
  setStorageItem("sneakersCart", sneakersCart)
  // Open cart always
  openCart()
}

function displayCartItemCount() {
  const amount = sneakersCart.reduce((total, cartItem) => {
    return total += cartItem.amount
  }, 0)
  cartItemCountDOM.textContent = amount
}

function displayCartTotal() {
  let total = sneakersCart.reduce((total, cartItem) => {
    return total += cartItem.price * cartItem.amount
  }, 0)
  cartTotalDOM.textContent = `Total : ${formatPrice(total)}`
}
function displayCartItemsDOM() {
  sneakersCart.forEach(cartItem => addToCartDOM(cartItem))
}

function increaseAmount(id) {
  let newAmount
  sneakersCart = sneakersCart.map(cartItem => {
    if (cartItem.id == id) {
      newAmount = cartItem.amount + 1
      cartItem = { ...cartItem, amount: newAmount }
    }
    return cartItem
  })
  return newAmount
}
function decreaseAmount(id) {
  let newAmount
  sneakersCart = sneakersCart.map(cartItem => {
    if (cartItem.id == id) {
      newAmount = cartItem.amount - 1
      cartItem = { ...cartItem, amount: newAmount }
    }
    return cartItem
  })
  return newAmount
}

function removeItem(id) {
  sneakersCart = sneakersCart.filter(cartItem => cartItem.id != id)
}

function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const element = e.target
    const parent = e.target.parentElement
    const id = e.target.dataset.id
    const parentID = e.target.parentElement.dataset.id

    // remove
    if (element.classList.contains("cart-item-remove-btn")) {
    removeItem(id)
    parent.parentElement.remove()
  }
  // increase
  if(parent.classList.contains("cart-item-increase-btn")){
    const newAmount = increaseAmount(parentID)
    parent.nextElementSibling.textContent = newAmount
  }
  if(parent.classList.contains("cart-item-decrease-btn")){
    const newAmount = decreaseAmount(parentID)
    if(newAmount === 0){
      removeItem(parentID)
      parent.parentElement.parentElement.remove()
    }
    else{
      parent.previousElementSibling.textContent = newAmount
    }
  }
  // decrease


  displayCartItemCount()
  displayCartTotal()
  setStorageItem("sneakersCart", sneakersCart)
})
}
const init = () => {

  // display amount of cart items
  displayCartItemCount()
  // display total
  displayCartTotal()
  // add all sneakersCart items to the DOM
  displayCartItemsDOM()
  // setup cart functionality
  setupCartFunctionality()
}
init()