const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");
const gameDetails = document.getElementById("gameDetails");
const detailText = document.getElementById("detailText");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const buyCartBtn = document.getElementById("buyCartBtn");
const clearCartBtn = document.getElementById("clearCartBtn");
const cartMessage = document.getElementById("cartMessage");

let allGames = [];
let cartData = localStorage.getItem("gamehubCart");
let cartList = [];

if (cartData) {
  cartList = JSON.parse(cartData);
}

// load games on page first
async function loadGames() {
  try {
    const response = await fetch("/games");
    const gamesList = await response.json();
    allGames = gamesList;
    showGames(gamesList);
  } catch (error) {
    gameList.innerHTML = '<p class="empty-text">Could not load games.</p>';
  }
}

function showGames(gameData) {
  gameList.innerHTML = "";

  if (gameData.length === 0) {
    gameList.innerHTML = '<p class="empty-text">No games found.</p>';
    return;
  }

  gameData.forEach(function (game) {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <div class="game-thumb">
        <span class="thumb-label">GameHub</span>
        <strong>${game.platform}</strong>
      </div>
      <div class="game-info">
        <h3>${game.name}</h3>
        <p class="platform-text">${game.platform}</p>
      </div>
      <div class="price-row">
        <span class="platform-pill">${game.platform}</span>
        <span class="price-tag">$${Number(game.price).toFixed(2)}</span>
      </div>
      <div class="card-buttons">
        <button class="small-btn detail-btn">View Details</button>
        <button class="small-btn buy-btn">Add To Cart</button>
      </div>
    `;

    const detailBtn = card.querySelector(".detail-btn");
    const buyBtn = card.querySelector(".buy-btn");

    detailBtn.addEventListener("click", function () {
      gameDetails.classList.remove("hidden");
      detailText.textContent =
        game.name +
        " costs $" +
        Number(game.price).toFixed(2) +
        " and works on " +
        game.platform +
        ".";
    });

    buyBtn.addEventListener("click", function () {
      addToCart(game);
    });

    gameList.appendChild(card);
  });
}

function addToCart(game) {
  // make small cart obj
  const cartGame = {
    name: game.name,
    price: game.price,
    platform: game.platform
  };

  cartList.push(cartGame);
  saveCartStuff();
  showCart();

  cartMessage.textContent = game.name + " added to cart";
  cartMessage.style.color = "green";
}

function saveCartStuff() {
  // save in browser local storage
  localStorage.setItem("gamehubCart", JSON.stringify(cartList));
}

function showCart() {
  cartItems.innerHTML = "";

  if (cartList.length === 0) {
    cartItems.innerHTML = '<p class="empty-text">Your cart is empty.</p>';
    cartTotal.textContent = "$0.00";
    return;
  }

  var totalPrice = 0;

  cartList.forEach(function (game, index) {
    totalPrice = totalPrice + Number(game.price);

    const cartCard = document.createElement("div");
    cartCard.className = "cart-item";

    cartCard.innerHTML = `
      <div>
        <h4>${game.name}</h4>
        <p>${game.platform}</p>
      </div>
      <div class="cart-item-right">
        <strong>$${Number(game.price).toFixed(2)}</strong>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;

    const removeBtn = cartCard.querySelector(".remove-btn");

    removeBtn.addEventListener("click", function () {
      removeCartItem(index);
    });

    cartItems.appendChild(cartCard);
  });

  cartTotal.textContent = "$" + totalPrice.toFixed(2);
}

function removeCartItem(index) {
  cartList.splice(index, 1);
  saveCartStuff();
  showCart();

  cartMessage.textContent = "Item removed from cart";
  cartMessage.style.color = "#b14b20";
}

async function buyCartGames() {
  if (cartList.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let savedCount = 0;

  for (let i = 0; i < cartList.length; i++) {
    const game = cartList[i];
    const priceNum = Number(game.price);

    const orderData = {
      gameName: game.name,
      gamePrice: priceNum,
      platform: game.platform
    };

    try {
      const response = await fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        savedCount = savedCount + 1;
      }
    } catch (error) {
      console.log("order error");
    }
  }

  if (savedCount === cartList.length) {
    alert("Payment successful");
    cartList = [];
    saveCartStuff();
    showCart();
    cartMessage.textContent = "Your cart order was placed";
    cartMessage.style.color = "green";
  } else {
    alert("Some cart items could not be bought");
    cartMessage.textContent = "Some cart items failed";
    cartMessage.style.color = "red";
  }
}

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase();

  const filteredGames = allGames.filter(function (game) {
    return game.name.toLowerCase().includes(searchText);
  });

  showGames(filteredGames);
});

buyCartBtn.addEventListener("click", function () {
  buyCartGames();
});

clearCartBtn.addEventListener("click", function () {
  cartList = [];
  saveCartStuff();
  showCart();
  cartMessage.textContent = "Cart cleared";
  cartMessage.style.color = "orange";
});

showCart();
loadGames();
