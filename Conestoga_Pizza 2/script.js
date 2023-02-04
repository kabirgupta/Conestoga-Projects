/* Pramod Jacob Sam
Student ID 8855432 */

document.addEventListener("DOMContentLoaded", () => {
  $(function () {
    $("#tabs").tabs();
  });

  setInterval(() => {
    findDate();
  }, 1000);

  const logoutButton = document.querySelector(".logout");
  logoutButton.addEventListener("click", logoutUser);

  const selectedItems = JSON.parse(localStorage.getItem("cart")) || [];
  const addToCartButtons = document.querySelectorAll(".tabs-item button");
  const shoppingIconCount = document.querySelector(".shopping-icon span");
  const shoppingParentIconCount = document.querySelector(
    ".shopping-icon-parent__main span"
  );
  shoppingIconCount.innerText = selectedItems.length;
  shoppingParentIconCount.innerText = selectedItems.length;

  addToCartButtons.forEach((cartButtons) => {
    cartButtons.addEventListener("click", (e) => {
      const name =
        e.target.parentElement.parentElement.querySelector(".name").innerText;
      const id = e.target.parentElement.parentElement.getAttribute("data-item");
      if (checkExistingItem(id)) {
        new Noty({
          text: "Item already in the cart",
          timeout: 3000,
          type: "warning",
          layout: "topRight",
        }).show();
      } else {
        selectedItems.push({
          id,
          name,
          basePrice: 5,
          size: "small",
          toppings: [],
          quantity: 1,
          totalPrice: 5,
        });
        addToCart(selectedItems);
        new Noty({
          text: "Item added to cart",
          timeout: 3000,
          type: "success",
          layout: "topRight",
        }).show();
      }
      shoppingIconCount.innerText = selectedItems.length;
      shoppingParentIconCount.innerText = selectedItems.length;
    });
  });

  function addToCart(items) {
    console.log(JSON.stringify(items));
    localStorage.setItem("cart", JSON.stringify(items));
  }

  function checkExistingItem(itemId) {
    if (selectedItems.find((item) => item.id == itemId)) {
      return true;
    } else {
      return false;
    }
  }

  function findDate() {
    let currentTime = new Date();
    let christmasYear = currentTime.getFullYear();

    if (currentTime.getMonth() == 11 && currentTime.getDate() > 25) {
      christmasYear += 1;
    }

    let christmasTime = new Date(christmasYear, 11, 25);
    let dateDiff = Math.floor(christmasTime - currentTime);
    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;

    if (
      currentTime.getMonth() !== 11 ||
      (currentTime.getMonth() == 11 && currentTime.getDate() !== 25)
    ) {
      days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
      hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((dateDiff % (1000 * 60)) / 1000);
    }

    displayDate(
      setPreceedingZero(setZero(days)),
      setZero(hours),
      setZero(minutes),
      setZero(seconds)
    );
  }

  function setZero(timeValue) {
    if (timeValue < 10) {
      timeValue = "0" + timeValue;
    }
    return timeValue.toString();
  }

  function setPreceedingZero(daysValue) {
    if (daysValue < 100) {
      daysValue = "0" + daysValue;
    }
    return daysValue.toString();
  }

  function displayDate(days, hours, minutes, seconds) {
    days.split("").forEach((day, index) => {
      document.querySelector(
        `.countdown-days .countdown-figure-${index + 1}`
      ).innerText = day;
    });

    hours.split("").forEach((day, index) => {
      document.querySelector(
        `.countdown-hours .countdown-figure-${index + 1}`
      ).innerText = day;
    });

    minutes.split("").forEach((day, index) => {
      document.querySelector(
        `.countdown-minutes .countdown-figure-${index + 1}`
      ).innerText = day;
    });

    seconds.split("").forEach((day, index) => {
      document.querySelector(
        `.countdown-seconds .countdown-figure-${index + 1}`
      ).innerText = day;
    });
  }

  isUserLoggedIn();
  logoutUser();
});
