const orderList = document.getElementById("orderList");

async function loadOrders() {
  try {
    const response = await fetch("/orders");
    const ordersData = await response.json();

    if (ordersData.length === 0) {
      orderList.innerHTML =
        '<p class="empty-text">No orders yet. Buy a game first.</p>';
      return;
    }

    orderList.innerHTML = "";

    ordersData.forEach(function (order) {
      const orderCard = document.createElement("div");
      orderCard.className = "order-card";

      const dateObj = new Date(order.orderDate);
      const orderDate = dateObj.toLocaleString();

      orderCard.innerHTML = `
        <h3>${order.gameName}</h3>
        <p><strong>Price:</strong> $${Number(order.gamePrice).toFixed(2)}</p>
        <p><strong>Platform:</strong> ${order.platform}</p>
        <p><strong>Purchased:</strong> ${orderDate}</p>
      `;

      orderList.appendChild(orderCard);
    });
  } catch (error) {
    orderList.innerHTML = '<p class="empty-text">Could not load orders.</p>';
  }
}

loadOrders();
