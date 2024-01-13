document.addEventListener("DOMContentLoaded", function () {
  const section = document.createElement("div");
  section.className = "section";

  const title = document.createElement("div");
  title.className = "title";
  title.textContent = "Contador de donaciones";
  section.appendChild(title);

  const ongContainer = document.createElement("div");
  ongContainer.className = "ong-container";
  section.appendChild(ongContainer);

  // Aquí puedes agregar los elementos "ong-card" de manera similar

  // Agregar la estructura al DOM
  const logoContainer = document.getElementById("logo");
  logoContainer.parentNode.insertBefore(section, logoContainer.nextSibling);

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
