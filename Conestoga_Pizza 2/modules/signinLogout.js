//  Pramod Jacob Sam
//     Student ID 8855432
function isUserLoggedIn() {
  const isSignedIn = JSON.parse(localStorage.getItem("signedIn"));
  if (isSignedIn) {
    removeShowHideClass();
    document.querySelector(".signin").classList.add("hide-option");
    document.querySelector(".logout").classList.add("show-option");
  } else {
    removeShowHideClass();
    document.querySelector(".signin").classList.add("show-option");
    document.querySelector(".logout").classList.add("hide-option");
  }
}

function logoutUser() {
  const isSignedIn = JSON.parse(localStorage.getItem("signedIn"));
  if (isSignedIn) {
    document.querySelector(".logout").addEventListener("click", (e) => {
      localStorage.setItem("signedIn", false);
      removeShowHideClass();
      document.querySelector(".signin").classList.add("show-option");
      document.querySelector(".logout").classList.add("hide-option");
      window.location.href = "../index.html";
    });
  }
}

function removeShowHideClass() {
  document.querySelector(".signin").classList.remove("show-option");
  document.querySelector(".logout").classList.remove("show-option");
  document.querySelector(".signin").classList.remove("hide-option");
  document.querySelector(".logout").classList.remove("hide-option");
}
