/* Ricardo Parra
Student ID 8808044 */

//fill in cities from a province
function city(get_province) {
  let html = `<option value="">-- Select --</option>`;
  for (i = 0; i < provinces_cities.length; i++) {
    if (provinces_cities[i].province == get_province) {
      for (j = 0; j < provinces_cities[i].city.length; j++) {
        html += `<option value="${provinces_cities[i].city[j]}">${provinces_cities[i].city[j]}</option>`;
      }
    }
  }
  return html;
}
//fill in provinces
function provinces() {
  let html = `<option value="">-- Select --</option>`;
  for (i = 0; i < provinces_cities.length; i++) {
    html += `<option value="${provinces_cities[i].province}">${provinces_cities[i].province}</option>`;
  }
  return html;
}

var time_fade; //fade red arrow field required
function fade_image(selector_arrow) {
  //Fade red arrow
  $(selector_arrow).attr("src", "arrow.png");
  time_fade = setInterval(() => {
    $(selector_arrow).fadeOut(1000);
    $(selector_arrow).fadeIn(1000);
  }, 0);
}

$(document).ready(function () {
  var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
  var phonePattern = /\d{3}-\d{3}-\d{4}/; //format 999-999-9999
  var zipcodePattern = /[A-Z]\d[A-Z]" "[A-Z]\d[A-Z]/; //format A#A A#A

  //Load tabs
  $(function () {
    $("#tabs_s").tabs();
  });

  //Load provinces
  document.getElementById("province").innerHTML = provinces();

  //Select province to show city
  $("#province").change(() => {
    const province = $("#province").val();

    if (province != "") {
      const html_city = city(province);
      document.getElementById("city").innerHTML = html_city;
    } else {
      document.getElementById("city").innerHTML = "";
    }
  });

  $("#submit_register").click((evt) => {
    let isValid = true;

    //Validation Contact Information
    const email = $("#email").val().trim();
    const name = $("#name").val().trim();
    const lastname = $("#lastname").val().trim();
    const password = $("#password").val().trim();
    const confirm_pwd = $("#confirm_pwd").val().trim();
    const terms = document.getElementById("terms").checked;
    const province = $("#province").val();
    const city = $("#city").val();

    //name
    if (name == "") {
      $("#name").next().text(" This field is required");
      isValid = false;
      fade_image("#name_arrow");
    } else if (name.length < 2) {
      $("#name").next().text(" Must be more than 2 letters");
      isValid = false;
      fade_image("#name_arrow");
    } else {
      $("#name").next().text("");
      $("#name_arrow").attr("src", "");
    }

    //lastname
    if (lastname == "") {
      $("#lastname").next().text(" This field is required");
      isValid = false;
      fade_image("#lastname_arrow");
    } else if (lastname.length < 2) {
      $("#lastname").next().text(" Must be more than 2 letters");
      isValid = false;
      fade_image("#lastname_arrow");
    } else {
      $("#lastname").next().text("");
      $("#lastname_arrow").attr("src", "");
    }

    //email
    if (email == "") {
      $("#email").next().text(" This field is required");
      isValid = false;
      fade_image("#email_arrow");
    } else if (!emailPattern.test(email)) {
      $("#email").next().text(" Must be a valid email address");
      isValid = false;
      fade_image("#email_arrow");
    } else {
      $("#email").next().text("");
      $("#email_arrow").attr("src", "");
    }

    //Password
    if (password == "") {
      $("#password").next().text(" This field is required");
      isValid = false;
      fade_image("#pwd_arrow");
    } else if (password.length <= 6) {
      $("#password").next().text(" Must be more than 6 characters");
      isValid = false;
      fade_image("#pwd_arrow");
    } else if (confirm_pwd == "") {
      $("#confirm_pwd").next().text(" This field is required");
      isValid = false;
      fade_image("#conpwd_arrow");
    } else if (confirm_pwd != password) {
      $("#password").next().text(" Must be the same password");
      fade_image("#pwd_arrow");
      $("#confirm_pwd").next().text(" Must be the same password");
      fade_image("#conpwd_arrow");
      isValid = false;
    } else {
      $("#password").next().text("");
      $("#confirm_pwd").next().text("");
      $("#pwd_arrow").attr("src", "");
      $("#conpwd_arrow").attr("src", "");
    }
    // province and city
    if (province != "" && city == "") {
      $("#city").next().text(" Must select valid city");
      isValid = false;
      fade_image("#city_arrow");
    } else if (city != "") {
      $("#city").next().text("");
      $("#city_arrow").attr("src", "");
    } else {
    }
    //terms
    if (!terms) {
      $("#req_terms").text(" --- Check to approve terms and conditions");
      isValid = false;
      fade_image("#terms_arrow");
    } else {
      $("#req_terms").text("");
      $("#terms_arrow").attr("src", "");
    }

    //Isvalid?
    if (!isValid) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      //Set in localstorage
      let user_data = [
        {
          user_email: email,
          user_pwd: password,
          user_name: name,
        },
      ];
      //Get from localstorage
      let user_data2 = JSON.parse(localStorage.getItem("user")) || [];
      //validate if the user is already registered//////////////////////////////////
      let user_exist = false;

      user_data2.forEach((item) => {
        if (item.user_email == email) {
          user_exist = true;
        }
      });

      if (user_exist) {
        $("#submit_register").next().text(" User already exist");
        fade_image("#submit_arrow");
      } else {
        $("#submit_register").next().text("");
        $("#submit_arrow").attr("src", "");
        user_data = user_data.concat(user_data2);

        localStorage.setItem("user", JSON.stringify(user_data));

        //clear all the fields
        $("#email").val("");
        $("#name").val("");
        $("#lastname").val("");
        $("#password").val("");
        $("#confirm_pwd").val("");
        $("#dob").val("");
        $("#phone").val("");
        $("#address").val("");
        $("#zipcode").val("");
        $("#province").val("").change();
        $("#terms").prop("checked", false);
        $("#promo").prop("checked", false);

        //move to signin
        $("#tabs_s").tabs("option", "active", 1);
      }
      evt.preventDefault();
      //window.location.href = "../OrderDetails/orderDetails.html";
    }
  });

  $("#submit_signin").click((evt) => {
    let isValid = true;
    let error_html = "<ul>";

    //Validations
    const email_signin = $("#email_signin").val().trim();
    const password_signin = $("#password_signin").val().trim();

    //email
    if (email_signin == "") {
      error_html += "<li>Email is required</li>";
      isValid = false;
    } else if (!emailPattern.test(email_signin)) {
      error_html += "<li>Must be a valid Email address</li>";
      isValid = false;
    } else {
    }
    //Password
    if (password_signin == "") {
      error_html += "<li>Password is required</li>";
      isValid = false;
    }

    //Get from localstorage
    let user_data2 = JSON.parse(localStorage.getItem("user")) || [];
    let user_exist = false;
    for (let j = 0; j < user_data2.length; j++) {
      if (
        user_data2[j].user_email == email_signin &&
        user_data2[j].user_pwd == password_signin
      ) {
        user_exist = true;
      }
    }

    if (!user_exist) {
      error_html += "<li>User or Password incorrect</li>";
      isValid = false;
    }
    if (error_html != "") {
      $("#display_error_sigin").css("display", "block");
      $("#display_error_sigin").css("text-align", "center");
      $("#display_error_sigin").css("color", "red");
      $("#display_error_sigin").html(error_html + "</ul>");
    } else {
      $("#display_sigin").css("display", "none");
      $("#display_sigin").html(error_html + "</ul>");
    }

    //Isvalid?
    if (!isValid) {
      evt.preventDefault();
    } else {
      const user_signed = {
        email_user: email_signin,
        signedIn: true,
      };
      localStorage.setItem("signedIn", JSON.stringify(user_signed));
      window.location.href = "../OrderDetails/orderDetails.html";
      evt.preventDefault();
    }
  });

  isAlreadySignedIn();
}); // end ready
