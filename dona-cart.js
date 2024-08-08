document.addEventListener("DOMContentLoaded", function () {
  var linkCart = document.createElement("link");
  linkCart.rel = "stylesheet";
  linkCart.type = "text/css";
  linkCart.href =
    "https://nicopicotto.github.io/donaclick-public/dona-cart.css";

  document.getElementsByTagName("head")[0].appendChild(linkCart);

  addFont(); // Agregar la fuente
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

function addFont() {
  var style = document.createElement("style");
  style.innerHTML = `
      @font-face {
         font-family: 'GothamRounded';
         src: url('https://raw.githubusercontent.com/NicoPicotto/donaclick-marketplace/develop/public/assets/fonts/Gotham-Rounded-Book.otf') format('opentype');
         font-weight: normal;
         font-style: normal;
      }
      @font-face {
         font-family: 'GothamRounded';
         src: url('https://raw.githubusercontent.com/NicoPicotto/donaclick-marketplace/develop/public/assets/fonts/Gotham-Rounded-Bold.otf') format('opentype');
         font-weight: bold;
         font-style: normal;
      }
   `;
  document.head.appendChild(style);
}

function addDonaClickSection() {
  console.log("DonáClick Run 30");
  var cartRow = document.querySelector(".cart-row");
  if (cartRow && !document.querySelector(".select-ong-section")) {
    var newSectionHTML = `
                  <div class="select-ong-section">
                 
                  <div class="select-ong-header">
                      <p class="select-ong_text">TUS COMPRAS TIENEN IMPACTO</p>
                      <img src="https://i.postimg.cc/tCZ79yZJ/logo.png"/>
                  </div>
                      
                      <p class="select-ong_subtitle">El <span class="span-bg">3%</span> del valor de tu carrito <span class="span-bold">será donado a la ONG</span> que vos elijas <span class="span-bold-underline">sin costo extra</span>.</p>
                      <div class="input-wrapper">     
                          <label class="select-ong_label" for="user-email">Tu correo electrónico</label>
                          <input type="email" id="user-email" placeholder="Ingresá tu email" required>
                          <label class="select-ong_label" for="select-ong">Eegí tu causa</label>
                          <select id="select-ong">
                              <option value="" disabled selected>Elegí tu causa</option>
                              <option value="Haciendo Camino">Haciendo Camino 🥛</option>
                              <option value="Rotary Club Río Cuarto">Rotary Club Río Cuarto 📚</option>
                              <option value="Fundación Donde Quiero Estar">Fundación Donde Quiero Estar 🏥</option>
                              <option value="Juntando Sonrisas">Juntando Sonrisas 🍲</option>
                              <option value="ManosporPatas">Manos Por Patas 🐶</option>
                              <option value="VolandoAlto">VolandoAlto 👩‍🏫</option>
                              <option value="Fundacion Soles">Fundación Soles 👪</option>
                              <option value="Banco de Alimentos">Banco de Alimentos BA 🍲</option>
                              
                          </select>
                      </div>
                      <button id="save-info" disabled>Confirmar Selección</button>
                      <div class="impact-message-container"></div>
                  </div>
              `;

    var visibleCartFilled = document.querySelector(
      ".js-visible-on-cart-filled"
    );

    var tempContainer = document.createElement("div");
    tempContainer.innerHTML = newSectionHTML;
    var newSectionElement = tempContainer.firstElementChild;

    if (cartRow.children.length > 1) {
      cartRow.insertBefore(newSectionElement, cartRow.children[1]);
    } else {
      cartRow.appendChild(newSectionElement);
    }

    var selectONG = document.getElementById("select-ong");
    var userEmailInput = document.getElementById("user-email");
    var saveInfoButton = document.getElementById("save-info");
    var cartSubtotalElement = document.querySelector(".js-ajax-cart-total");

    var ongActions = {
      "Haciendo Camino": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 750,
        itemName: "vaso(s) de leche. ¡Los chicos te lo agradecen!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAATJJREFUaEPtWVEOwjAIhZPpTqaezN0MR2KTbYbSsnaWDH72oeB7vNdYGILzQOf4IQj8W8FiBYiI1mARcZN79HNrI4JA6lwoYPRQWMiNhYwKd08rtlB3JMYfCALGxjVLExUgojsAPACAnz1jBoAXIvKzOnIE3ieAT4BnRJyq0S/McwQ2dx9L8Zqc/d2qNDcIlHbK+D0+G89c7jAKKAQn6ZB7ISAe8iBg9PZPWu2ElwoMo0AQ2Gu6HxFbWUWqEwqEAgc9FhYKC13dQhp/aV4Y5p9YISBeq10QyE1rIxNIQ3524B+GQI+Z2P1WgvdBTOKMUGdf8RKYQ0dEZ6hgBs/Y1d3o8mqMtwK8oesR5oWWOpGt0X5J3Bpu6g6tE9fYVAV6tL1lzSDQspuWWqGApWstc9wr8AFVVvAxIG6sAAAAAABJRU5ErkJggg=="/>`,
      },
      "Rotary Club Río Cuarto": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 4000,
        itemName:
          "kit(s) de útiles para estudiantes. ¡Las mentes curiosas valoran esto!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAR9JREFUaEPtmVEOAiEMRNuT6Z5MPZl7s2qT9YcIFJZKicOPH3ZxZl7ZRMq0+OLF9RMMzCZoIiAiVyK6EZF+/nI9mPle+sGqARF5ThCeat6Yef9mpGggiHjVvTPz1mRARBSdtk2Ixe9e+jsDEiL6Q0QPARgYSdCNQG7jVvHyfmsU3/cdh9jUQjBwxA4Caf/VEmnt8bP1bof4rDDr8zBgTcqrDgS8krXuCwLWpLzqQMArWeu+IGBNyqsOBLySte4LAtakvOpAwCtZ674gYE3Kq24EgepdvZf44n1R7sv0T/2o+5/RJrPzgXQ2sLwBIlquhXQepuOlEKv5EKvqQCMm6jUQhkKXgU/vHPOyy8xp5SkDIQ5BRkR1ThxZvGqDgdmEXlbctTE0wEhuAAAAAElFTkSuQmCC"/>`,
      },
      "Fundación Donde Quiero Estar": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 4000,
        itemName:
          "mes(es) de tratamiento psicológico para pacientes oncológicos ¡Ellos te lo agradecen!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAALlJREFUaEPtmEEOgCAMBOn/H40xkcTohW43Ecx4prWd3SISbfMnNq+/0cDXCtoU6L33TDMRYXm3JclZOA1k5LutRYEBAwthIZEAFiqCYxfCQlioSGA5C2W/qKb+p9M8T7GvXYgGpllqC1FA4+aLQgEfSy0TCmjcfFEo4GOpZfq/AhoXLrZUbr7b6ewhkLvRSzN+6pf7I1OniRkQyTEDzIBonRGGhbDQKhYq1iGH22ZArqAYSANFgOXwA1MNoDHhxk7tAAAAAElFTkSuQmCC"/>`,
      },
      "Juntando Sonrisas": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 1000,
        itemName: "platos de comida. ¡Los chicos te lo agradecen!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAblJREFUaEPtWFGWwyAIlJttT7a7J2tv5sa3Nk8J6qjBaF/yWVAZZqAomcU/Wjx+cwO4mkGYAWutDYMlomhtr701ETeAd+ZWYOBpjPkKqH4Q0SsA0GUfIaEfY8x3cNCLiB4BgC77CAAu+y7L4fe71bIL3Fhru+zqAHyQXCbu511KW6PiLFTZW0DAXShVrFtdcClF7bbWXguiBYAklZCFLrs6gISU9lo4w14DopqBRMFyGXEWquzqADyIKUaLJgZuAP//G1kGURk1M4AeoO33eQD8SOBmnnBw004ksr8bHF273gdIt+jAgLVWGheQA0b4RO04BYCPAiMCg8/gN8GPZGB5CUkjMUyxsmM0c6VqQJomleOCt18bAC9gkYHMzQtOk5LjIfs5ADPKCAcgTZtKWYW3leSTZMADmKkbidnPApipFlLZRwDMUAvRCyDXXHGcTrz1wNrtdExK571vEcCF9VAMviihMHuDmYCCrwIwkAk4+GoAHoRWYYs3rlINQTUgbcJfFUoHley5VplbewMoZRa1X8HAmTe3w2UdBo46cr8Tn1+airfqj6wV5Ih1zUU8IjjkjBsAkiVNnz+sfjRAiGsVigAAAABJRU5ErkJggg=="/>`,
      },
      ManosporPatas: {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 750,
        itemName: "días de comida para mascotas. ¡Firulais te lo agradece!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAbpJREFUaEPtmFFyxCAIhvFm3ZO1PVm3J6OLo5nESBASkuwUX/ZBo3zwg7gJ3nykN7cfAuDqCLpFABERAJ4A8J1Sol+X4Q1QjSaILw+CswDIdheIMwGeKaXH0VE4E4CzveaHKVfuADAHU8vsbgDqXLkjgApiBYCIHwDwWeJq0iV9W+6BrZzNd0RZQOfRueL69k7pAfzMNjNXjgGARzWmOI3OlcbKnh4A3aDTSK8bSNq1N+8EAK09UgTItslTGpABAK2E8vEWAJOMBgA0/mAVwSVxq0fy1q+mn0HEeS6ZjO18JOdAqSB7Ds+SezWj1LzVanYUwErObILu8GD2kgNAV8qbFcZoxHSQ8XsuWt1iIpZIYzLmnkZR3yWJsT2SF8BUfg+A2GzwPAEWmlXm1HDV8wSgKCzexLM+i+t7qDci8OE3tDdA1fZKBk3TqLpjFq2OlD3GJOa2VT9YJPvOikBrR22jqbfZ9W/FVQC7u926QQBIGpXmre+NiIDk2dH5iIDkKe4e0HruqH1ae81VKACKK7WOiAhM9Vf5f1HkAFNtIomlMlznQ0L/VkKjErlqnZjEVxk2em4AjHrKa90fPAs3QM5bqGsAAAAASUVORK5CYII="/>`,
      },
      VolandoAlto: {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 2000,
        itemName: "hora/s de alfabetización. ¡Los chicos te lo agradecen!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd1JREFUaEPtWFtywyAMlE7W9mRNTtb0ZGrkAQ/FWEiWjJsOfHkSBLtavWyEF1/44vhhErhawanAVMDpgRlCpQOJ6B0APtNv/HznZ0S8OR29a+5WoAF677IHAHwDwAMR+TlkHSJgAC2BDFFHTSAIdDghkcAA0O5w2xC4EPQhdVoEKCS7TjoEnyWtPPpfEuD6Xdbzk3xpPpZL770uwb0kzg0oNyfzrQEGTeD5XEsZHUlGBC3mgMZjRMRk3lKoaUy0e9TAzQq0EKSSG5EvZuAhBKpB7kiIHQauJkBEXzyEWSbKFGJ8Ryv5VaBzQ0XEDyn+uklMTzTFActEeYAM5wuvTRmswdX5VTeuer+VwGqfD2ZPecfjYnzhfPq1RhDICvF4bJr1JeBrjFejwxkKtGYnkYylDI9UYC/XFjLpT07qTZiISXqRAtrG1d33FxTogrxEgVQSb1WZdYFtGUcowI3MFLeBLLhviJ9kNH2AwTOJ4avnfQbUJcCbUr0eTaLrfTWB7PpUv89+uVHNSmujs8ZF4Ajdupo7uTi8mTuxRNDSUYVzTB4PJVAeVozQ/PPe21ruyMs30iWGnd9JVUlsDbOR+yeBkd5uduqrAXjvnyHk9aDXfirg9aDXfirg9aDX/gf8lt0xri4oaAAAAABJRU5ErkJggg=="/>`,
      },
      "Fundacion Soles": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 3500,
        itemName:
          "cena/s para niños en tratamiento ambulatorio y sus familias. ¡Ellos te lo agradecen!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAcdJREFUaEPtWVFyQyEIhJO1OVnbkzU5GS0ZX8coKKJOfI3+5CPj6rKguA/h5ANPvn/YBJ6t4FZgK9AZgf+bQkT0CQAfnQGSpl8B4AsR+bd7ZAoQ0TsAfHcjlwGuiHgZsYZEgDfPJKYORBySvhIBmrrzAL4JHIFIo02/1ftSCqSp0BmA+8nUUuDdNTCYwCG++ZRalQAT4buC76LiWJmAiUQzgdbjT6sJCYeI0juomkqrEZDal2IqLUWAc0bqwUqqL0cgkEjvIlWFZgLpkeA9RktRVTphkcSSBIIKpoJ+GoHa+a78n6lwNgLcZjzsuZuAM5LuaZuAO3SDJm4FBgXSDfPyCvydw4N8o2Y8iwKaoZVdIp0kPHhZey16M0Jfnl0gRxJ738BaL1TBu6SOnmoupUDOBdVibcSzd6NRZNNmyiK5+oIS0q0L79hnSQHJYqwVXQuBhzevUk/tT8pIAY87neVonENSbVUuhCLe3UMqATSeMtVoNTrfPltFsBpNbrXVrQgk+LtDyQE3bb6qQKGgY57mxZJ04hR9i4iwrXizmFkxjtmjD5HjuRy9WwDhtBnypcXbHJkJeBeYPW8TmB3hGv5WoBah2f//AMdWQkD9nsHGAAAAAElFTkSuQmCC"/>`,
      },
      "Banco de Alimentos": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 1000,
        itemName: "platos de comida. ¡Los chicos te lo agradecen!",
        icon: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAblJREFUaEPtWFGWwyAIlJttT7a7J2tv5sa3Nk8J6qjBaF/yWVAZZqAomcU/Wjx+cwO4mkGYAWutDYMlomhtr701ETeAd+ZWYOBpjPkKqH4Q0SsA0GUfIaEfY8x3cNCLiB4BgC77CAAu+y7L4fe71bIL3Fhru+zqAHyQXCbu511KW6PiLFTZW0DAXShVrFtdcClF7bbWXguiBYAklZCFLrs6gISU9lo4w14DopqBRMFyGXEWquzqADyIKUaLJgZuAP//G1kGURk1M4AeoO33eQD8SOBmnnBw004ksr8bHF273gdIt+jAgLVWGheQA0b4RO04BYCPAiMCg8/gN8GPZGB5CUkjMUyxsmM0c6VqQJomleOCt18bAC9gkYHMzQtOk5LjIfs5ADPKCAcgTZtKWYW3leSTZMADmKkbidnPApipFlLZRwDMUAvRCyDXXHGcTrz1wNrtdExK571vEcCF9VAMviihMHuDmYCCrwIwkAk4+GoAHoRWYYs3rlINQTUgbcJfFUoHley5VplbewMoZRa1X8HAmTe3w2UdBo46cr8Tn1+airfqj6wV5Ih1zUU8IjjkjBsAkiVNnz+sfjRAiGsVigAAAABJRU5ErkJggg=="/>`,
      },
    };

    function showImpactMessage() {
      if (cartSubtotalElement) {
        var subtotalString = cartSubtotalElement.textContent;
        var subtotal = parseFloat(
          subtotalString.replace("$", "").replace(/\./g, "").replace(",", ".")
        );
        var donationAmount = subtotal * 0.03;

        var selectedOng = selectONG.value;
        var ongAction = ongActions[selectedOng];

        var itemCount = Math.max(
          1,
          Math.round(donationAmount / ongAction.itemCost)
        );

        var impactMessageHTML = `
                      <div class="impact-message">
           ${ongAction.icon} <p>${ongAction.message} ${itemCount} ${ongAction.itemName}.</p>
        </div>`;

        var existingImpactMessage = document.querySelector(".impact-message");
        if (existingImpactMessage) {
          existingImpactMessage.remove();
        }

        var impactMessageContainer = document.querySelector(
          ".impact-message-container"
        );
        if (impactMessageContainer) {
          impactMessageContainer.innerHTML = impactMessageHTML;
        }
      } else {
        console.log("CartSubtotal no encontrado");
      }
    }

    selectONG.addEventListener("change", function () {
      checkInputs();
      showImpactMessage();
    });

    function checkInputs() {
      var isEmailFilled = userEmailInput.value.length > 0;
      var isOngSelected = selectONG.value !== "";
      saveInfoButton.disabled = !(isEmailFilled && isOngSelected);
    }

    userEmailInput.addEventListener("input", checkInputs);
    selectONG.addEventListener("change", checkInputs);

    saveInfoButton.addEventListener("click", function (event) {
      event.preventDefault();

      var subtotalString = cartSubtotalElement.textContent;
      var subtotal = parseFloat(
        subtotalString.replace("$", "").replace(/\./g, "")
      );

      var formattedSubtotal = subtotal.toString().replace(".", ",");

      var selectedValue = selectONG.value;
      var userEmail = userEmailInput.value;

      console.log("Selected ONG: ", selectedValue);
      console.log("User Email: ", userEmail);
      console.log("Subtotal: ", formattedSubtotal);

      if (selectedValue && userEmail && subtotal !== undefined) {
        saveInfoButton.innerHTML = '<div class="loaderDona"></div>';
        saveInfoButton.disabled = true;

        var formData = new FormData();
        formData.append("mail", userEmail);
        formData.append("ong", selectedValue);
        formData.append("monto", formattedSubtotal);

        var productElements = document.querySelectorAll(
          '[data-component="name.short-name"]'
        );
        var productNames = Array.from(productElements)
          .map(function (element) {
            return element.textContent.trim();
          })
          .join(", ");
        formData.append("productos", productNames);

        var formDataEntries = {};
        formData.forEach((value, key) => {
          formDataEntries[key] = value;
        });

        fetch(
          "https://script.google.com/macros/s/AKfycbxIyXgIvonuPRhEMZZdO3xhiTVqBrx05RoJitb2yb7ySfeZCYO70ypL9Ts4sBKWrvZT/exec",
          {
            method: "POST",
            body: formData,
            mode: "no-cors",
          }
        )
          .then(function (response) {
            console.log("Datos enviados con éxito");
            console.log("formData: ", formData);

            var checkoutButton = document.querySelector(
              'input[name="go_to_checkout"]'
            );
            checkoutButton.click();
          })
          .catch(function (error) {
            console.error("Error al enviar los datos:", error);
          });
      } else {
        alert(
          "Por favor, introduce tu correo electrónico y selecciona una ONG antes de guardar la información."
        );
      }
    });

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

/*
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
                            <option value="Fundacion Soles">Fundación Soles 👪</option>
                        </select>
                    </div>
                    <button id="save-info" disabled>¡Sumate!</button>
                </div>
            `;

    //Mostrar mensaje debajo del subtotal (donación)
    var visibleCartFilled = document.querySelector(
      ".js-visible-on-cart-filled",
    );

    // Crear un contenedor temporal para convertir el HTML en un elemento DOM
    var tempContainer = document.createElement("div");
    tempContainer.innerHTML = newSectionHTML;
    var newSectionElement = tempContainer.firstElementChild;

    // Insertar la nueva sección como segundo hijo de cartRow
    if (cartRow.children.length > 1) {
      cartRow.insertBefore(newSectionElement, cartRow.children[1]);
    } else {
      cartRow.appendChild(newSectionElement);
    }

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
      ManosporPatas: {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 750,
        itemName: "días de comida para mascotas 🐶 ¡Firulais te lo agradece!",
      },
      VolandoAlto: {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 2000,
        itemName: "hora/s de alfabetización 📚 Los chicos te lo agradecen 💛",
      },
      "Fundacion Soles": {
        message: "¡Felicidades! Estás colaborando con",
        itemCost: 3500,
        itemName:
          "cena/s para niños en tratamiento ambulatorio y sus familias 👪",
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
*/
