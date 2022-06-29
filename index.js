/*
Description
In this exercise we explore a common scenario in eCommerce, adding and removing items from the cart, and calculating the total.

Deliverables
- A user can view a selection of items in the store
- From the store, a user can add an item to their cart
- From the cart, a user can view and adjust the number of items in their cart
- If an item's quantity equals zero it is removed from the cart
- A user can view the current total in their cart

Instructions
- Use this template as a starting point => https://codesandbox.io/s/day-11-grocero-template-j2yis
- Create a state object
- Create action functions that update state
- Create render functions  that read from state and update the visuals
*/

let state = {
  storeItems: [
    {
      id: 1,
      name: "beetroot",
      price: 0.45,
      stock: 10,
      inCart: 0,
    },
    {
      id: 2,
      name: "carrot",
      price: 0.15,
      stock: 2,
      inCart: 0,
    },
    {
      id: 3,
      name: "apple",
      price: 0.25,
      stock: 3,
      inCart: 0,
    },
    {
      id: 4,
      name: "apricot",
      price: 0.55,
      stock: 4,
      inCart: 0,
    },
    {
      id: 5,
      name: "avocado",
      price: 0.85,
      stock: 1,
      inCart: 0,
    },
    {
      id: 6,
      name: "bananas",
      price: 0.25,
      stock: 8,
      inCart: 0,
    },
    {
      id: 7,
      name: "bell-pepper",
      price: 0.35,
      stock: 4,
      inCart: 0,
    },
    {
      id: 8,
      name: "berry",
      price: 0.25,
      stock: 3,
      inCart: 0,
    },
    {
      id: 9,
      name: "blueberry",
      price: 0.5,
      stock: 9,
      inCart: 0,
    },
    {
      id: 10,
      name: "eggplant",
      price: 0.45,
      stock: 1,
      inCart: 0,
    },
  ],
};

// input: item
// action: generates a path for this item's image
// output: the path
function getItemImagePath(item) {
  let id = String(item.id).padStart(3, "0");
  return `assets/icons/${id}-${item.name}.svg`;
}

// input: nothing
// action: get the items that are in the cart
// output: the cart items
function getCartItems() {
  return state.storeItems.filter((item) => item.inCart > 0);
}

// output: the current total
function getTotal() {
  return state.storeItems.map((item) => item.price * item.inCart);
}

function increaseQuantity(item) {
  if (item.stock === 0) return;

  item.inCart++;
  item.stock--;
}

function decreaseQuantity(item) {
  if (item.inCart > 0) {
    item.inCart--;
    item.stock++;
  }
}

function renderStoreItems() {
  let storeUl = document.querySelector(".store--item-list");
  storeUl.textContent = "";

  for (let item of state.storeItems) {
    let storeItemEl = document.createElement("li");

    let iconDiv = document.createElement("div");
    iconDiv.className = ".store--item-icon";

    let iconImg = document.createElement("img");
    iconImg.src = getItemImagePath(item);

    let addBtn = document.createElement("button");
    addBtn.textContent = `Add to cart (${item.stock})`;
    addBtn.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    iconDiv.append(iconImg);
    storeItemEl.append(iconDiv, addBtn);
    storeUl.append(storeItemEl);
  }
}

function renderCartItems() {
  let cartUl = document.querySelector(".cart--item-list");
  cartUl.textContent = "";

  let cartItems = getCartItems();

  for (let item of cartItems) {
    let cartLi = document.createElement("li");

    let itemImg = document.createElement("img");
    itemImg.className = "cart--item-icon";
    itemImg.src = getItemImagePath(item);
    itemImg.alt = item.name;

    let itemNameP = document.createElement("p");
    itemNameP.textContent = item.name;

    let removeBtn = document.createElement("button");
    removeBtn.className = "quantity-btn remove-btn center";
    removeBtn.textContent = "-";
    removeBtn.addEventListener("click", function () {
      decreaseQuantity(item);
      render();
    });

    let quantitySpan = document.createElement("span");
    quantitySpan.className = "quantity-text center";
    quantitySpan.textContent = String(item.inCart);

    let addBtn = document.createElement("button");
    addBtn.className = "quantity-btn add-btn center";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", function () {
      increaseQuantity(item);
      render();
    });

    cartLi.append(itemImg, itemNameP, removeBtn, quantitySpan, addBtn);
    cartUl.append(cartLi);
  }
}

function renderTotal() {
  let totalPriceSpan = document.querySelector(".total-number");
  totalPriceSpan.textContent = "";

  let prices = getTotal();
  let sum = 0;

  for (price of prices) {
    sum += price;
  }

  console.log(sum);
  totalPriceSpan.textContent = `£${sum.toFixed(2)}`;
}

function render() {
  renderStoreItems();
  renderCartItems();
  renderTotal();
}

render();
