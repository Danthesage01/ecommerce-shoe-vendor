import { getElement } from "./utils.js";

const sidebarOverlay = getElement(".sidebar-overlay")
const toggleSidebar = getElement(".toggle-nav")
const closeSidebar = getElement(".sidebar-close")

toggleSidebar.addEventListener("click", (e)=>{
sidebarOverlay.classList.add("show")
})
closeSidebar.addEventListener("click", (e)=>{
sidebarOverlay.classList.remove("show")
})