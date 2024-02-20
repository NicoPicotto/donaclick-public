document.addEventListener("DOMContentLoaded", function () {
  var linkCart = document.createElement("link");
  linkCart.rel = "stylesheet";
  linkCart.type = "text/css";
  linkCart.href =
    "https://nicopicotto.github.io/donaclick-public/dona-cart.css";

  // Insertar el elemento link en el head de la página
  document.getElementsByTagName("head")[0].appendChild(linkCart);

  addDonaClickSection();

  var addToCartButton = document.querySelector(".js-addtocart");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", function () {
      setTimeout(function () {
        addDonaClickSection();
      }, 3000);
    });
  }
});

function addDonaClickSection() {
  console.log("DonáClick Run 30");
  var cartRow = document.querySelector(".cart-row");
  if (cartRow && !document.querySelector(".select-ong-section")) {
    // Estructura HTML base de la nueva sección en el cart
    var newSectionHTML = `
                <div class="select-ong-section">
				<div class="select-ong-header">
					<p class="select-ong_text">Sumale valor a tus compras y ayudá a una ONG <span>sin costo extra</span></p>
					<img src="https://i.postimg.cc/0NJmXZwx/logoinvert.png"/>
				</div>
                    
                    
                    <div class="input-wrapper">     
                        <label class="select-ong_label" for="user-email">Tu correo electrónico:</label>
                        <input type="email" id="user-email" placeholder="tunombre@gmail.com" required>
                        <label class="select-ong_label" for="select-ong">Seleccioná la ONG a la que desees aportar:</label>
                        <select id="select-ong">
                            <option value="" disabled selected>Lista de ONG's de DonaClick®</option>
                            <option value="Haciendo Camino">Haciendo Camino 🥛</option>
                            <option value="Rotary Club Río Cuarto">Rotary Club Río Cuarto 📚</option>
                            <option value="Fundación Donde Quiero Estar">Fundación Donde Quiero Estar 🏥</option>
                            <option value="Juntando Sonrisas">Juntando Sonrisas 🍲</option>
							              <option value="ManosporPatas">Manos Por Patas 🐶</option>
                            <option value="VolandoAlto">VolandoAlto 👩‍🏫</option>
                        </select>
                    </div>
                    <button id="save-info" disabled>¡Sumate!</button>
                </div>
            `;

    //Mostrar mensaje debajo del subtotal (donación)
    var visibleCartFilled = document.querySelector(
      ".js-visible-on-cart-filled",
    );

    // Añadir la nueva sección al elemento cart-row
    cartRow.innerHTML += newSectionHTML;

    // Seleccionar elementos del DOM
    var selectONG = document.getElementById("select-ong");
    var userEmailInput = document.getElementById("user-email");
    var saveInfoButton = document.getElementById("save-info");
    var cartSubtotalElement = document.querySelector(".js-ajax-cart-total");

    //Mensajes y equivalencias de cada ONG
    var ongActions = {
      "Haciendo Camino": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 750,
        itemName: "vaso(s) de leche 🥛 Los chicos te lo agradecen 💛",
      },
      "Rotary Club Río Cuarto": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 4000,
        itemName:
          "kit(s) de utiles para estudiantes 📚 Las mentes curiosas valoran esto 👨‍🎓",
      },
      "Fundación Donde Quiero Estar": {
        message: "¡Muchas gracias! Estás colaborando con",
        itemCost: 4000,
        itemName:
          "mes(es) de tratamiento psicológico para pacientes oncológicos 😷",
      },
      "Juntando Sonrisas": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 1000,
        itemName: "platos de comida 🍲 Los chicos te lo agradecen 💛",
      },
      "Manos Por Patas": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 750,
        itemName: "días de comida para mascotas 🐶 ¡Firulais te lo agradece!",
      },
      VolandoAlto: {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 2000,
        itemName: "hora/s de alfabetización 📚 Los chicos te lo agradecen 💛",
      },
    };

    //Mostrar mensaje luego de hacer la seleccion de ONG
    function showImpactMessage() {
      if (cartSubtotalElement) {
        var subtotalString = cartSubtotalElement.textContent;
        var subtotal = parseFloat(
          subtotalString.replace("$", "").replace(/\./g, "").replace(",", "."),
        );
        var donationAmount = subtotal * 0.03;

        var selectedOng = selectONG.value;
        var ongAction = ongActions[selectedOng];

        // Calcular la cantidad de artículos que se pueden comprar con la donación (min 1)
        var itemCount = Math.max(
          1,
          Math.round(donationAmount / ongAction.itemCost),
        );

        var impactMessageHTML = `
					<div class="impact-message">
						${ongAction.message} ${itemCount} ${ongAction.itemName}.
					</div>`;

        // Eliminar el mensaje anterior si existe
        var existingImpactMessage = document.querySelector(".impact-message");
        if (existingImpactMessage) {
          existingImpactMessage.remove();
        }

        // Insertar el nuevo mensaje
        if (visibleCartFilled) {
          visibleCartFilled.insertAdjacentHTML("afterend", impactMessageHTML);
        }
      } else {
        console.log("CartSubtotal no encontrado");
      }
    }

    // Evento 'change' para el select de ONG
    selectONG.addEventListener("change", function () {
      checkInputs();
      showImpactMessage();
    });

    // Función para comprobar si ambos campos están llenos
    function checkInputs() {
      var isEmailFilled = userEmailInput.value.length > 0;
      var isOngSelected = selectONG.value !== "";
      saveInfoButton.disabled = !(isEmailFilled && isOngSelected);
    }

    // Eventos para activar o desactivar el botón de guardar
    userEmailInput.addEventListener("input", checkInputs);
    selectONG.addEventListener("change", checkInputs);

    // Evento para el botón de "Guardar información"
    saveInfoButton.addEventListener("click", function (event) {
      event.preventDefault();

      var subtotalString = cartSubtotalElement.textContent;
      var subtotal = parseFloat(
        subtotalString.replace("$", "").replace(/\./g, ""),
      );

      var formattedSubtotal = subtotal.toString().replace(".", ",");

      var selectedValue = selectONG.value;
      var userEmail = userEmailInput.value;

      if (selectedValue && userEmail && subtotal !== undefined) {
        // Mostrar el spinner en el botón
        saveInfoButton.innerHTML = '<div class="loaderDona"></div>';
        saveInfoButton.disabled = true;

        // Preparar los datos para enviar
        var formData = new FormData();
        formData.append("mail", userEmail);
        formData.append("ong", selectedValue);
        formData.append("monto", formattedSubtotal);

        //nuevo
        var productElements = document.querySelectorAll(
          '[data-component="name.short-name"]',
        );
        var productNames = Array.from(productElements)
          .map(function (element) {
            return element.textContent.trim();
          })
          .join(", ");
        formData.append("productos", productNames);

        // Enviar los datos a Google Apps Script
        fetch(
          "https://script.google.com/macros/s/AKfycbxIyXgIvonuPRhEMZZdO3xhiTVqBrx05RoJitb2yb7ySfeZCYO70ypL9Ts4sBKWrvZT/exec",
          {
            method: "POST",
            body: formData,
            mode: "no-cors",
          },
        )
          .then(function (response) {
            console.log("Datos enviados con éxito");
            console.log("formData: ", formData);

            // Simular clic en el botón de checkout
            var checkoutButton = document.querySelector(
              'input[name="go_to_checkout"]',
            );
            checkoutButton.click();
          })
          .catch(function (error) {
            console.error("Error al enviar los datos:", error);
            // Manejar el error
          });
      } else {
        alert(
          "Por favor, introduce tu correo electrónico y selecciona una ONG antes de guardar la información.",
        );
      }
    });

    //Tomar querys para cada ONG
    var selectONG = document.getElementById("select-ong");

    function getQueryParam(param) {
      var urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }

    var ongQueryParam = getQueryParam("ong");
    if (
      ongQueryParam &&
      selectONG.querySelector(`option[value="${ongQueryParam}"]`)
    ) {
      selectONG.value = ongQueryParam;
      localStorage.setItem("selectedOng", ongQueryParam);
    } else {
      // Recuperar la selección de ONG de localStorage
      var storedOng = localStorage.getItem("selectedOng");
      if (
        storedOng &&
        selectONG.querySelector(`option[value="${storedOng}"]`)
      ) {
        selectONG.value = storedOng;
      }
    }
  } else {
    console.log("Elemento .cart-row no encontrado");
  }
}
