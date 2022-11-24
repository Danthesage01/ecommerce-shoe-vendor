// const URL = "https://fake-shoevendor.herokuapp.com/sneakers/"
// const URL = "https://fake-shoe-server.herokuapp.com/products/"
// const URL = "https://restfapi.netlify.app/api/sneakers";
// const SPURL = "https://restfapi.netlify.app/api/single-sneaker?id=";

const URL = "https://restfapi.netlify.app/api/allsneakers";
const SPURL = "https://restfapi.netlify.app/api/allsneakers?id=";

// A getElement function to get elements from the DOM
const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector. No such element exist!`
  );
};

// Format price for the UI to dollars instead of cents in the API
const formatPrice = (price) => {
  let formattedprice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return formattedprice;
};

// getStorageItem is to get item from localStorage
const getStorageItem = (item) => {
  // initializing a variable that get item from localStorage
  let storageItem = localStorage.getItem(item);
  // if statement that checks if item is already in localStorage
  if (storageItem) {
    // if item is already in localStorage then parse the item and set it back tp storageItem
    storageItem = JSON.parse(localStorage.getItem(item));
  }
  // else statement for if item is not already in localStorage
  else {
    // if item is not already in localStorage then set empty array to storageItem
    storageItem = [];
  }
  // Return the storageItem regardless of the condition it fulfills
  return storageItem;
};

// setStorageItem is to set item to localStorage
const setStorageItem = (name, item) => {
  // set item to localStorage with a name and a stringified item
  localStorage.setItem(name, JSON.stringify(item));
};

function scrollToTop() {
  const topScroll = getElement(".top-link");
  const cartOverlay = getElement(".cart-overlay");
  const sidebarOverlay = getElement(".sidebar-overlay");

  window.addEventListener("scroll", () => {
    const scrollHeight = window.pageYOffset;

    if (scrollHeight > 500) {
      topScroll.classList.add("show-toplink");
    } else {
      topScroll.classList.remove("show-toplink");
    }
    if (cartOverlay.classList.contains("show")) {
      topScroll.classList.remove("show-toplink");
    }
    if (sidebarOverlay.classList.contains("show")) {
      topScroll.classList.remove("show-toplink");
    }
  });

  topScroll.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const element = getElement(id);
    let position = element.offsetTop - 62;
    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });
  });
}

export {
  URL,
  getElement,
  formatPrice,
  setStorageItem,
  getStorageItem,
  scrollToTop,
  SPURL,
};
