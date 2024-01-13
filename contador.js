document.addEventListener("DOMContentLoaded", function () {
  console.log("hola desde codesandbox");
  fetch(
    "https://script.google.com/macros/s/AKfycbwnAtMwYh6vgn0x1S8FY3LdrxQdNV6uZkj9hoxR4hqjKGvcPIkQs6ls7VDRkQ3APySoQA/exec",
  )
    .then((response) => response.json())
    .then((data) => {
      const cards = document.querySelectorAll(".ong-card");
      cards.forEach((card) => {
        const ongName = card.querySelector("h3").textContent;
        const numberElement = card.querySelector(".number");
        const donationCount = data[ongName];
        if (donationCount) {
          numberElement.textContent = donationCount;
        }
      });
      console.log("contador");
    });
});
