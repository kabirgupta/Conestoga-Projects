// Kabir Gupta
// I Helped create the Gallery Page for the Pizza Store Website
// Student ID: 8812834

"use strict";
//we use the ready method and execute the code within the main function
$(document).ready(function () {
  //declare the variable and create an empty array
  // Make an object of Image
  // Here we use the source of the image that where the image is
  // same it will done for alt as well
  //store the image in the array
  let imgCache_1 = [];
  $("#slides_1 img").each((index, img) => {
    const image = new Image();
    image.src = $(img).attr("src");
    image.title = $(img).attr("alt");
    imgCache_1[index] = image;
  });

  //declared the variable image_count that starts with 1
  //Used the set interval method where each slide takes 2 seconds (2000 milliseconds) for image to load.
  //using the fade out method for animation.
  //declare the image_count variable and increament by 1
  let image_count = 1;
  setInterval(() => {
    $("#slide_1").fadeOut(2000, () => {
      image_count = (image_count + 1) % imgCache_1.length;
      const next_img = imgCache_1[image_count];
      $("#slide_1").attr("src", next_img.src).fadeIn(2000);
    });
  }, 2000);
  isUserLoggedIn();
  logoutUser();
});
