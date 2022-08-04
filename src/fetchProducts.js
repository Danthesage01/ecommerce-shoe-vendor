import { URL } from "./utils.js"

const fetchProducts = async () =>{
const res = await fetch(URL)
const products = await res.json()
return products
}
export default fetchProducts