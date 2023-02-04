/* Ricardo Parra
Student ID 8808044 */

let dataDB = JSON.parse(localStorage.getItem("cart")) || [];
const userDB = [];

$(document).ready(function () {
  let subtotal = 0,
    shipping = 0,
    taxes = 0,
    total = 0;
  let html_detail_pizza = "";
  let date_time = new Date();
  let date_order = "";
  date_order = date_time.toDateString() + " " + date_time.toLocaleTimeString();

  for (let i = 0; i < dataDB.length; i++) {
    let chain_toppings = "";
    total_price_detail = 0;
    for (let j = 0; j < dataDB[i].toppings.length; j++) {
      chain_toppings += `${dataDB[i].toppings[j].topping}, `;
    }
    chain_toppings = chain_toppings.substring(0, chain_toppings.length - 2); // delete last ,
    html_detail_pizza += `<div><img src="../Images/pizza.png" height="100" /></div>
    <div class="detail_pizza">
      <h3>${dataDB[i].size} ${dataDB[i].name}</h3>
      <p>Toppings: ${chain_toppings}</p>
    </div>
    <div class="detail_pizza">
      <p>Qty</p>
      <p>${dataDB[i].quantity}</p>
    </div>
    <div class="detail_pizza"><p>$${dataDB[i].totalPrice}</p></div>`;
    subtotal += dataDB[i].totalPrice;
  }

  shipping = 2; //2 we are starting the business
  taxes = subtotal * 0.13; //13% of subtotal
  taxes = taxes.toFixed(0);
  total = subtotal + parseInt(shipping) + parseInt(taxes);

  //update content
  $("#info_pizza").html(html_detail_pizza);
  $("#subtotal").html("$" + subtotal);
  $("#shipping").html("$" + shipping);
  $("#taxes").html("$" + taxes);
  $("#total").html("$" + total);
  const orderid = Math.floor(Math.random() * 9999999999);
  $("#order_id").html(orderid);
  $("#order_date").html(date_order);

  isUserLoggedIn();
  isNotSignedIn();
  logoutUser();
}); // end ready
