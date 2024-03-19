document.addEventListener("DOMContentLoaded", function () {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://nicopicotto.github.io/donaclick-public/contador.css";

  // Insertar el elemento link en el head de la página
  document.getElementsByTagName("head")[0].appendChild(link);

  /*
  const htmlContador = `
  <div class="ong-container">
    <div class="ong-card" data-ong="Haciendo Caminos">
        <div class="number-wrapper">
            <h2 class="number">&nbsp;</h2>
            <h2>🥛</h2>
        </div>
        <p>Vasos de leche</p>
        <h3>Haciendo Camino</h3>
     </div>
    <div class="ong-card">
        <div class="number-wrapper">
            <h2 class="number">&nbsp;</h2>
            <h2>📚</h2>
        </div>
        <p>Packs de &uacute;tiles</p>
        <h3>Rotary Rio Cuarto</h3>
    </div>
    <div class="ong-card">
        <div class="number-wrapper">
            <h2 class="number">&nbsp;</h2>
            <h2>🍲</h2>
        </div>
        <p>Platos de comida</p>
        <h3>Juntando Sonrisas</h3>
    </div>
    <div class="ong-card">
        <div class="number-wrapper">
            <h2 class="number">&nbsp;</h2>
            <h2>😷</h2>
        </div>
        <p>Meses de trat. psicol&oacute;gico</p>
        <h3>Fundacion Donde Quiero Estar</h3>
    </div>
    <div class="ong-card">
        <div class="number-wrapper">
            <h2 class="number">&nbsp;</h2>
            <h2>🐶</h2>
        </div>
        <p>D&iacute;as de comida para perros</p>
        <h3>Manos Por Patas</h3>
    </div>
</div>
  `;

  const logoDiv = document.getElementById("logo");
  logoDiv.innerHTML += htmlContador;

  // Función para actualizar los números en las tarjetas
  function actualizarContador(data) {
    const cards = document.querySelectorAll(".ong-card");
    cards.forEach((card) => {
      const ongName = card.querySelector("h3").textContent;
      const numberElement = card.querySelector(".number");
      const donationCount = data[ongName];
      if (donationCount) {
        numberElement.textContent = donationCount;
      }
    });
  }
  */

  // Verifica si los datos ya están en sessionStorage
  const storedData = sessionStorage.getItem("contadorONG");
  if (storedData) {
    actualizarContador(JSON.parse(storedData));
    console.log("traido del session");
  } else {
    fetch(
      "https://script.google.com/macros/s/AKfycbwnAtMwYh6vgn0x1S8FY3LdrxQdNV6uZkj9hoxR4hqjKGvcPIkQs6ls7VDRkQ3APySoQA/exec",
    )
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("contadorONG", JSON.stringify(data));
        actualizarContador(data);
        console.log("traido del fetch");
      });
  }
});
