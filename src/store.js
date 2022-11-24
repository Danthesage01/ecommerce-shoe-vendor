// setupStore helps to store the fetched products in localStorage and allow subsequent uses of the data swift from locastorage and UI

// Import getStorageItem and setStorageItem from utils
import { getStorageItem, setStorageItem } from "./utils.js";

// getting items from localStorage and setting it in sneakersStore
// let sneakersStore = [] - First before localStorage
let sneakersStore = getStorageItem("sneakersStore")

// A function to setUp localStorage for fetched products
const setupStore = (products) =>{
  // iterating over the fetched products and setting it to sneakersStore
  sneakersStore = products.map(product =>{
  // destructuring items in the fetched products
    const { id, url, images, featured, colors, description, brand, gender, name, price } = product
  // returning the destructured items 
    return { id, url, images, featured, colors, description, brand, gender, name, price }
  })
  // set sneakersStore in localstorage 
  setStorageItem("sneakersStore", sneakersStore)
}

/* 
findProduct is to find and return a product from the store (LS -localStorage) by looking through the id (parameter).
- Now if there is a product id that matches the argument (id) we passed to findProduct
- then return the product that has particular id
*/
const findProduct = (id) =>{
  let product = sneakersStore.find(product => product.id == id)
  return product
}

export {
  sneakersStore,
  setupStore,
  findProduct
}