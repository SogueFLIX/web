var slider = document.querySelector(".slider");
var images = slider.getElementsByTagName("img");
var current = 0;

function slide() {
  images[current].classList.remove("active");
  current = (current + 1) % images.length; /* Get the next image */
  images[current].classList.add("active");
}

setInterval(slide, 3000); /* Change the slide every 3 seconds */
