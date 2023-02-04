/* Pramod Jacob Sam
Student ID 8855432 */

document.addEventListener("DOMContentLoaded", () => {
  function itemsAccordian() {
    const sizePrice = {
      small: 0,
      medium: 2,
      large: 4,
    };

    let dataFromDB = JSON.parse(localStorage.getItem("cart")) || [];

    initializeRender();

    function initializeRender() {
      if (dataFromDB.length > 0) {
        const orderDecisionTotal = document.querySelector(
          ".orderdecision__total span"
        );
        orderDecisionTotal.innerHTML = `$${dataFromDB.reduce(
          (acc, item) => acc + item.totalPrice,
          0
        )}`;
        const orderDecisionTax = document.querySelector(
          ".orderdecision__tax span"
        );

        orderDecisionTax.innerHTML = `$${Math.round(
          +orderDecisionTotal.innerHTML.split("$")[1] * 0.13
        )}`;

        const orderDecisionNetTotal = document.querySelector(
          ".orderdecision__netTotal span"
        );
        orderDecisionNetTotal.innerHTML = `$${
          +orderDecisionTotal.innerHTML.split("$")[1] +
          2 +
          +orderDecisionTax.innerHTML.split("$")[1]
        }`;
        let accordianContainer = document.querySelector(
          ".accordian__container"
        );
        accordianContainer.innerHTML = "";
        let output = dataFromDB.map((data) => {
          const selectedToppings = data.toppings.map((d) => d.topping);
          return `
                      <div class="accordian__item">
                      <div class="accordian__item--single">
                        <h3 class="accordian__item--heading">${
                          data.name
                        } Pizza</h3>
                        <div class="accordian__item--container">
                          <div class="accordian__item--options">
                            <div>
                              <h4>Size</h4>
                              <div class="accordian__size">
                                <div>
                                  <input
                                    type="radio"
                                    id="small-${data.id}"
                                    ${data.size == "small" && "checked"}
                                    name="size-${data.id}"
                                    data-item="${data.id}"
                                  />
                                  <label for="small-${data.id}">Small</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    ${data.size == "medium" && "checked"}
                                    id="medium-${data.id}"
                                    name="size-${data.id}"
                                    data-item="${data.id}"
                                  />
                                  <label for="medium-${data.id}">Medium</label>
                                </div>
                                <div>
                                  <input
                                    type="radio"
                                    ${data.size == "large" && "checked"}
                                    id="large-${data.id}"
                                    name="size-${data.id}"
                                    data-item="${data.id}"
                                  />
                                  <label for="large-${data.id}">Large</label>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4>Toppings</h4>
                              <div class="accordian__toppings">
                                <div>
                                  <label for="pepperoni">Pepperoni</label>
                                  <input
                                    type="checkbox"
                                    id="pepperoni"
                                    name="toppings"
                                    ${
                                      selectedToppings.includes("pepperoni") &&
                                      "checked"
                                    }
                                    data-item="${data.id}"
                                  />
                                </div>
                                <div>
                                  <label for="chicken">Chicken</label>
                                  <input
                                    type="checkbox"
                                    id="chicken"
                                    name="toppings"
                                    ${
                                      selectedToppings.includes("chicken") &&
                                      "checked"
                                    }
                                    data-item="${data.id}"
                                  />
                                </div>
                                <div>
                                  <label for="bellpepper">Bell Pepper</label>
                                  <input
                                    type="checkbox"
                                    id="bellpepper"
                                    name="toppings"
                                    ${
                                      selectedToppings.includes("bellpepper") &&
                                      "checked"
                                    }
                                    data-item="${data.id}"
                                  />
                                </div>
                                <div>
                                  <label for="sausage">Sausage</label>
                                  <input
                                    type="checkbox"
                                    id="sausage"
                                    name="toppings"
                                    ${
                                      selectedToppings.includes("sausage") &&
                                      "checked"
                                    }
                                    data-item="${data.id}"
                                  />
                                </div>
                                <div>
                                  <label for="onion">Onion</label>
                                  <input
                                    type="checkbox"
                                    id="onion"
                                    name="toppings"
                                    ${
                                      selectedToppings.includes("onion") &&
                                      "checked"
                                    }
                                    data-item="${data.id}"
                                  />
                                </div>
                                <div>
                                  <label for="mushroom">Mushroom</label>
                                  <input
                                    type="checkbox"
                                    id="mushroom"
                                    name="toppings"
                                    ${
                                      selectedToppings.includes("mushroom") &&
                                      "checked"
                                    }
                                    data-item="${data.id}"
                                  />
                                </div>
                              </div>
                            </div>
                            <div class="accordian__second--col">
                              <label for="quantity">Qty</label>
                              <select name="quantity" class="quantity" data-item="${
                                data.id
                              }">
                                <option value="1" ${
                                  data.quantity == 1 && "selected"
                                }>1</option>
                                <option value="2" ${
                                  data.quantity == 2 && "selected"
                                }>2</option>
                                <option value="3" ${
                                  data.quantity == 3 && "selected"
                                }>3</option>
                                <option value="4" ${
                                  data.quantity == 4 && "selected"
                                }>4</option>
                                <option value="5" ${
                                  data.quantity == 5 && "selected"
                                }>5</option>
                              </select>
                              <button data-item="${data.id}">Remove</button>
                            </div>
                            <div class="accordian__third--col" data-item="${
                              data.id
                            }">
                              <img src="../Images/pizza.png" alt="item" />
                              <h4>Price: <span>$${data.totalPrice}</span></h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      `;
        });
        accordianContainer.insertAdjacentHTML("beforeEnd", output);
        initializeElementAndEventListener();
      } else {
        let orderSummaryContainer = document.querySelector(".orderSummary");
        orderSummaryContainer.innerHTML = `
        <div class="orderSummary__noItem">
          <i class="fa-solid fa-cart-shopping"></i>
          <p>No items in the cart!</p>
        </div>
        `;

        orderSummaryContainer.insertAdjacentHTML("beforeEnd", output);
      }
    }

    function updateData(id, option, value) {
      switch (option) {
        case "size":
          dataFromDB.forEach((item) =>
            item.id == id ? (item.size = value) : item
          );
          break;
        case "toppings":
          dataFromDB.forEach((item) =>
            item.id == id
              ? (item.toppings = value.filter((val) => val.id == id))
              : item
          );
          break;
        case "quantity":
          dataFromDB.forEach((item) =>
            item.id == id ? (item.quantity = value) : item
          );
          break;
        case "delete":
          dataFromDB = dataFromDB.filter((item) => item.id != id);
          break;
        default:
          break;
      }

      updateDatabase(dataFromDB);
      dataFromDB.forEach((data) => {
        if (data.id == id) {
          data.totalPrice =
            (data.basePrice + sizePrice[data.size] + data.toppings.length * 2) *
            data.quantity;
        }
      });
    }

    function initializeElementAndEventListener() {
      const sizeElements = document.querySelectorAll(
        ".accordian__size input[type='radio']"
      );

      const toppingsElements = document.querySelectorAll(
        ".accordian__toppings input[type='checkbox']"
      );

      const quantityElements = document.querySelectorAll(
        ".accordian__second--col .quantity"
      );

      const deleteItemButtons = document.querySelectorAll(
        ".accordian__second--col button"
      );

      toppingsElements.forEach((toppingsElement) => {
        toppingsElement.addEventListener("change", (e) => {
          const selectedToppings = [];
          document
            .querySelectorAll(
              ".accordian__toppings input[type='checkbox']:checked"
            )
            .forEach((el) => {
              selectedToppings.push({
                id: el.getAttribute("data-item"),
                topping: el.id,
              });
            });
          const id = e.srcElement.dataset["item"];
          updateData(id, "toppings", selectedToppings);
          initializeRender();
        });
      });

      sizeElements.forEach((sizeElement) => {
        sizeElement.addEventListener("change", (e) => {
          const id = e.srcElement.dataset["item"];
          updateData(id, "size", e.target.id.split("-")[0]);
          initializeRender();
        });
      });

      quantityElements.forEach((quantityElement) => {
        quantityElement.addEventListener("change", (e) => {
          const id = e.srcElement.dataset["item"];
          updateData(id, "quantity", e.target.value);
          initializeRender();
        });
      });

      deleteItemButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", (e) => {
          const id = e.srcElement.dataset["item"];
          updateData(id, "delete");
          initializeRender();
        });
      });
    }
  }

  function submitOrder() {
    if (JSON.parse(localStorage.getItem("cart")).length > 0) {
      document
        .querySelector(".orderdecision button")
        .addEventListener("click", (e) => {
          const name = document.querySelector(".accordian-2 #name");
          const email = document.querySelector(".accordian-2 #email");
          const phone = document.querySelector(".accordian-2 #phone");
          const address = document.querySelector(".accordian-3 #address");
          const city = document.querySelector(".accordian-3 #city");
          const province = document.querySelector(".accordian-3 #province");
          const zipcode = document.querySelector(".accordian-3 #zipcode");
          const card = document.querySelector(
            ".accordian-4 input[type='radio']:checked"
          );
          const cardNumber = document.querySelector(".accordian-4 #cardNumber");
          const expiry = document.querySelector(".accordian-4 #cardExpiry");
          const cvv = document.querySelector(".accordian-4 #cardCvv");

          const validationElements = [
            name,
            email,
            phone,
            address,
            city,
            province,
            zipcode,
            cardNumber,
            expiry,
            cvv,
          ];
          const totalValidates = validationElements.map((el) => {
            el.classList.remove("error");
            switch (el.getAttribute("id")) {
              case "name":
              case "address":
              case "city":
              case "province":
                if (el.value.length == 0) {
                  notifyError(el.getAttribute("id"));
                  el.classList.add("error");
                  return false;
                }
                return true;
              case "email":
                const emailPattern =
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                if (!emailPattern.test(el.value)) {
                  notifyError(el.getAttribute("id"));
                  el.classList.add("error");
                  return false;
                }
                return true;
              case "phone":
                const phonePattern =
                  /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
                if (!phonePattern.test(el.value)) {
                  notifyError(el.getAttribute("id"));
                  el.classList.add("error");
                  return false;
                }
                return true;
              case "zipcode":
                const zipPattern =
                  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
                if (!zipPattern.test(el.value)) {
                  notifyError(el.getAttribute("id"));
                  el.classList.add("error");
                  return false;
                }
                return true;
              case "cardNumber":
                switch (card.id) {
                  case "visa":
                    const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
                    if (!visaPattern.test(el.value)) {
                      notifyError("card number");
                      el.classList.add("error");
                      return false;
                    }
                    return true;
                  case "mastercard":
                    const mastercardPattern =
                      /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
                    if (!mastercardPattern.test(el.value)) {
                      notifyError("card number");
                      el.classList.add("error");
                      return false;
                    }
                    return true;
                  case "maestro":
                    const maestroPattern =
                      /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/;
                    if (!maestroPattern.test(el.value)) {
                      notifyError("card number");
                      el.classList.add("error");
                      return false;
                    }
                    return true;
                  default:
                    break;
                }
                break;
              case "cardExpiry":
                const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
                if (!expiryPattern.test(el.value)) {
                  notifyError("card expiry");
                  el.classList.add("error");
                  return false;
                }
                return true;
              case "cardCvv":
                const cvvPattern = /^[0-9]{3,4}$/;
                if (!cvvPattern.test(el.value)) {
                  notifyError("cvv");
                  el.classList.add("error");
                  return false;
                }
                return true;
              default:
                break;
            }
          });

          if (totalValidates.includes(false)) {
          } else {
            // getStripeSession(JSON.parse(localStorage.getItem("cart")));
            window.location.href = "../Order_Summary/order_summary.html";
          }
        });
    }
  }

  function notifyError(field) {
    new Noty({
      text: `Please fill the ${field} field correctly`,
      layout: "topRight",
      type: "error",
      timeout: 3000,
    }).show();
  }

  function updateDatabase(data) {
    localStorage.setItem("cart", JSON.stringify(data));
  }

  async function getStripeSession(data) {
    let cart = data.map((item) => {
      return {
        name: item.name,
        description: JSON.stringify(
          item.toppings.length > 0 ? item.toppings : "No Toppings"
        ),
        price: item.totalPrice,
        quantity: item.quantity,
      };
    });

    let line_items = cart.map(function (item) {
      return {
        price_data: {
          currency: "cad",
          product_data: {
            name: item.name,
            description: item.description,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    var API_TOKEN =
      "sk_test_51MDVRNJxLqUpEIJOsC8IvuOEiunneXEPeICSaAAHZq74jwvrBaldso1fiFVNXvQdqsdvpNXmfLHftq6W9B8kbK4G00mrMPwbqr";
    let stripeRequest = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-type": "application/x-www-form-urlencoded",
        },
        body: buildQuery({
          payment_method_types: ["card"],
          mode: "payment",
          success_url: "http://127.0.0.1:5500/Order_Summary/order_summary.html",
          cancel_url: "http://127.0.0.1:5500/OrderDetails/orderDetails.html",
          line_items,
        }),
      }
    );

    // Get the session data
    let session = await stripeRequest.json();

    // Redirect to Stripe Checkout
    window.location.href = session.url;

    function buildQuery(data, prefix) {
      // Determine the data type
      var type = Object.prototype.toString
        .call(data)
        .slice(8, -1)
        .toLowerCase();

      // Loop through the object and create the query string
      return Object.keys(data)
        .map(function (key, index) {
          // Cache the value of the item
          var value = data[key];

          // Add the correct string if the object item is an array or object
          if (type === "array") {
            key = prefix + "[" + index + "]";
          } else if (type === "object") {
            key = prefix ? prefix + "[" + key + "]" : key;
          }

          // If the value is an array or object, recursively repeat the process
          if (typeof value === "object") {
            return buildQuery(value, key);
          }

          // Join into a query string
          return key + "=" + encodeURIComponent(value);
        })
        .join("&");
    }
  }

  itemsAccordian();
  submitOrder();

  isUserLoggedIn();
  isNotSignedIn("../SignIn/signIn.html");
  logoutUser();
});
