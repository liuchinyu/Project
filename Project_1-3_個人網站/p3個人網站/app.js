let nav = document.querySelector("nav");

/*當沒有捲動Y軸時，不會有陰影*/
window.addEventListener("scroll", () => {
  if (window.scrollY == 0) {
    nav.style.boxShadow = "";
  } else {
    nav.style.boxShadow = "0 10px 6px -6px #777";
  }
});
