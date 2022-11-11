
window.addEventListener("load", function () {
    const upload = this.document.querySelector(".upload");
    setTimeout(() => {
    upload.style.display = "none";
    }, 3000);
});

const header = document.getElementById('header')

if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY >= 50) {
      header.classList.add('scroll-header')
    } else {
      header.classList.remove('scroll-header')
    };
  });
};

const menu = document.querySelector(".nav_menu");
const iconMenu = document.querySelector (".bx-grid-alt");
const iconClose = document.querySelector (".bx-x");
const linkMenu = document.querySelectorAll (".nav_list a[href^='#']");

iconMenu.addEventListener("click", function(){
    menu.classList.toggle("show-menu");
});

iconClose.addEventListener("click", function(){
    menu.classList.remove("show-menu");
});

linkMenu.forEach(linkMenu => {
    linkMenu.addEventListener("click", function() {
       menu.classList.remove("show-menu")
    });
});

const changeTheme = document.querySelector(".change-theme");
  changeTheme.addEventListener("click", ()=> {
    document.body.classList.toggle("dark-theme");
      changeTheme.classList.toggle("bx-sun");
        if (localStorage.getItem("dark-theme")) {
            localStorage.removeItem ("dark-theme");
            } else {
                   localStorage.setItem("dark-theme", "true");
                   };
});
        if (localStorage.getItem("dark-theme")){
           document.body.classList.add("dark-theme");
           changeTheme.classList.add("bx-sun")
           } else {
                  document.body.classList.remove("dark-theme")
                  changeTheme.classList.remove("bx-sun")
};

const cart = document.querySelector(".cart")
const cartShop = document.querySelector(".bx-shopping-bag")
const cartClose = document.querySelector(".cart_close")

cartShop.addEventListener("click", function(){
    cart.classList.toggle("show-cart");
});

cartClose.addEventListener("click", function(){
    cart.classList.remove("show-cart");
});

const productsContent = document.querySelector(".products_content");
const cartContainer = document.querySelector(".cart__container");
const cartPrice =document.querySelector(".cart__price");
const cartProduct = document.querySelector(".count");
const cartTotal = document.querySelector(".cart_prices");
const cartPriceItem = document.querySelector(".cart_price_item");
const cartPriceTotal = document.querySelector(".cart_price_total");

const products = [
  {
    id: 0,
    name: "Hoddies",
    price: 14,
    stock: 10,
    urlImage: "./src/img/featured1.png",
  },
  {
    id: 1,
    name: "Shirts",
    price: 24,
    stock: 15,
    urlImage: "./src/img/featured2.png",
  },
  {
    id: 2,
    name: "Sweatshirts",
    price: 24,
    stock: 20,
    urlImage: "./src/img/featured3.png",
  }
];

function addProduct(idProduct) {
  const currentProduct = products.find( (product) => product.id === idProduct);
       if (currentProduct.stock === objCartStore[idProduct].amount)
           return alert ("No hay más producto en el Stock");
           objCartStore[currentProduct.id].amount++;
};

function deleteProduct(idProduct) {
  const op = confirm ("¿Estas seguro que quieres salir?");
        if (op) {
                delete objCartStore[idProduct];
    };
};

function printTotal(){
  const arrayCartStore = Object.values(objCartStore);
      if (!arrayCartStore.length)
          return (cartTotal.innerHTML = `
          <span id="cart_count">0 items</span>
            <span class="cart_price_total">$0.00</span>`);

      let total = arrayCartStore.reduce((acum, curr)=> {
           acum += curr.price * curr.amount;
               return acum;
 }, 0);
           cartTotal.innerHTML = `
           <span class="cart_price_item">
              <span id="cart_count"></span>items</span>
                <span class="cart_price_total">$${total}.00</span></span>`
};

function countProduct() {
  const arrayCartStore = Object.values(objCartStore);
       let suma = arrayCartStore.reduce((acum, curr)=> {
           acum += curr.amount;
           return acum;
  }, 0);
       cartProduct.textContent = suma;
};

function printStore() {
  let html = '';
      products.forEach(({id, name, price, stock, urlImage})=> {
        html += `
            <article class="products_card">
                <div class="products_shape">
                  <img src="${urlImage}" alt="${name}" class="products_img">
                  </div>
                  <div class="products_data">
                      <h2 class="products_price">$ ${price}.00 <span class="products_quality">| Stock: ${stock}</span></h2>
                      <h3 class="products_name">${name}</h3>
                      <button class="button_products"><i class="bx bx-plus" id="${id}"></i></button>
                  </div>
            </article>`
  });
  productsContent.innerHTML = html;
};

let objCartStore = {};

function printStoreInCart() {
  let html = '';
      const arrayCartStore = Object.values(objCartStore);
        arrayCartStore.forEach(({id, name, price, stock, amount, urlImage}) => {
          html += `
                  <article class="cart__card">
                    <div class="cart__box">
                        <img src="${urlImage}" alt="${name}" class="cart__img">
                    </div>
                    <div class="cart__details">
                        <h3 class="cart__title">${name}</h3>
                        <span class="cart__stock">
                        Stock: ${stock} |
                        <span class="cart__price">$${price}.00</span>
                        </span>
                        <span class="cart__subtotal">Subtotal:$ 28.00</span>
                    <div class="cart__amount">
                    <div class="cart__amount-content">
                        <span class="cart__amount-box minus" id="${id}">
                        <i class="bx bx-minus" id= "${id}"></i>
                        </span>
                        <span class="cart__amount-number">${amount}</span>
                        <span class="cart__amount-box plus" id="${id}">
                        <i class="bx bx-plus" id= "${id}"></i>
                        </span>
                    </div>
                      <i class="bx bx-trash-alt cart__amount-trash" id="${id}"></i>
          </div>
    </div>
</article>`
});
  cartContainer.innerHTML = html;
  printTotal();
  countProduct();
};

productsContent.addEventListener("click", (e) => {
  if (e.target.classList.contains("bx-plus")) {
      const idProduct = Number(e.target.id);
      const currentProduct = products.find( (product) => product.id === idProduct);
      if (objCartStore[currentProduct.id]){
          addProduct(idProduct);
          } else {
                 objCartStore[currentProduct.id] = { ...currentProduct};
                 objCartStore[currentProduct.id].amount = 1;
      };
    printStoreInCart();
  };
});

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("bx-plus")) {
      const idProduct = Number(e.target.id);
      addProduct(idProduct);
  };
  if (e.target.classList.contains("bx-minus")) {
      const idProduct = Number(e.target.id);
      if (objCartStore[idProduct].amount === 1){
        deleteProduct(idProduct);
        } else {
               objCartStore[idProduct].amount--;
      };
  };

  if (e.target.classList.contains("bx-trash-alt")) {
      const idProduct = Number(e.target.id);
         deleteProduct(idProduct);
  };
  printStoreInCart();
});

cartShop.addEventListener("click", () => {
  cartContainer.classList.toggle("show-cart");
});

printStore();
printTotal();





