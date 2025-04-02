!(function () {
  "use strict";
  var e = document.querySelector("#mainNav");
  if (e) {
    var o = e.querySelector(".navbar-collapse");
    if (o) {
      var t = new bootstrap.Collapse(o, { toggle: !1 }),
        n = o.querySelectorAll("a");
      for (var r of n)
        r.addEventListener("click", function (e) {
          t.hide();
        });
    }
    var a = function () {
      (void 0 !== window.pageYOffset
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop) > 100
        ? e.classList.add("navbar-shrink")
        : e.classList.remove("navbar-shrink");
    };
    a(), document.addEventListener("scroll", a);
    var l = document.querySelectorAll(".portfolio-modal");
    for (var d of l)
      d.addEventListener("shown.bs.modal", function (o) {
        e.classList.add("d-none");
      }),
        d.addEventListener("hidden.bs.modal", function (o) {
          e.classList.remove("d-none");
        });
    var i = document.querySelectorAll("section"),
      s = e.querySelectorAll(".navbar-nav a");
    function u() {
      let e = "";
      i.forEach((o) => {
        const t = o.offsetTop - 150,
          n = t + o.offsetHeight;
        window.scrollY >= t && window.scrollY < n && (e = o.getAttribute("id"));
      }),
        s.forEach((o) => {
          o.classList.toggle("active", o.getAttribute("href") === `#${e}`);
        });
    }
    document.addEventListener("scroll", u), u();
    var c = document.createElement("button");
    (c.id = "backToTop"),
      (c.className = "btn position-fixed bottom-0 end-0 m-3"),
      (c.style = "background-color: #DDB760"),
      (c.style.display = "none"),
      (c.innerText = "↑ Powrót na góre"),
      document.body.appendChild(c),
      window.addEventListener("scroll", function () {
        window.scrollY > 100
          ? (c.style.display = "block")
          : (c.style.display = "none");
      }),
      c.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }
})();

// document.addEventListener("DOMContentLoaded", () => {
//   const cardsContainer = document.getElementById("cardsContainer");
//   const loadMoreButton = document.getElementById("loadMoreBtn");

//   let currentPage = 1;
//   const initialPageSize = 6; // initial load: 6 cards
//   const loadMorePageSize = 3;  // on "ZOBACZ WSZYSTKIE" load 3 more
//   // Base API URL (adjust for your environment)
//   const baseApiUrl = "http://localhost:1337/api/nieruchomosci-2s";

//   // Fetch cards from the API with pagination parameters
//   function fetchCards(page, pageSize) {
//     // Strapi pagination (adjust according to your Strapi version)
//     const url = `${baseApiUrl}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(result => {
//         renderCards(result.data);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         cardsContainer.innerHTML = "<p>Error loading data.</p>";
//       });
//   }

//   // Render card elements from the fetched data
//   function renderCards(cards) {
//     cards.forEach(card => {
//       const cardHTML = `
//         <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 mb-4">
//           <div class="card custom-card" data-id="${card.id}" data-bs-toggle="modal" data-bs-target="#realEstateModal">
//             <div class="card-body text-center">
//               <h5 class="card-title">${card.Tytul} ${card.Numer_Oferty}</h5>
//               <p class="card-text">
//                 Cena: ${card.Cena.toLocaleString()} PLN<br>
//                 Cena/m²: ${card.Cena_Per_Metr2} PLN/m²
//               </p>
//               <a role="button" data-bs-toggle="modal" data-bs-target="#realEstateModal">
//                 Dowiedź więcej <i class="bi bi-arrow-right"></i>
//               </a>
//             </div>
//           </div>
//         </div>
//       `;
//       cardsContainer.insertAdjacentHTML("beforeend", cardHTML);
//     });
//   }

//   // Initial fetch of 6 cards
//   fetchCards(currentPage, initialPageSize);

//   // Load more cards when button is clicked
//   loadMoreButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     currentPage++;
//     fetchCards(currentPage, loadMorePageSize);
//   });

//   // Update modal content when a card is clicked
//   const modalElement = document.getElementById("realEstateModal");
//   modalElement.addEventListener("show.bs.modal", function (event) {
//     // Get the triggering element and its parent card with data-id attribute
//     const triggerElement = event.relatedTarget;
//     const cardElement = triggerElement.closest(".card");
//     if (!cardElement) return;
//     const cardId = cardElement.getAttribute("data-id");
//     updateModalContent(cardId);
//   });

//   // Fetch and update modal content with detailed card info
//   function updateModalContent(cardId) {
//     const url = `${baseApiUrl}/${cardId}?populate=*`;
//     fetch(url)
//       .then(response => response.json())
//       .then(result => {
//         const card = result.data;
//         // Update modal title and body with detailed data
//         document.getElementById("realEstateModalLabel").innerText = card.Tytul + " " + card.Numer_Oferty;
//         document.getElementById("modalBody").innerHTML = `
//           <div>
//             <p><strong>Cena:</strong> ${card.Cena.toLocaleString()} PLN</p>
//             <p><strong>Cena/m²:</strong> ${card.Cena_Per_Metr2} PLN/m²</p>
//             <p>${card.Opis}</p>
//           </div>
//         `;
//       })
//       .catch(error => {
//         console.error("Error fetching detailed data:", error);
//         document.getElementById("modalBody").innerHTML = "<p>Error loading details.</p>";
//       });
//   }
// });