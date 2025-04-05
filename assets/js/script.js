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

document.addEventListener('DOMContentLoaded', () => {
  let allOffers = [];
  let currentDisplayedCount = 0;
  const initialDisplayCount = 6;
  const additionalCount = 3;
  
  const offersRow = document.getElementById('offersRow');
  const loadMoreButton = document.getElementById('loadMoreButton');
  const noMoreOffersDiv = document.getElementById('noMoreOffers');
  
  // Fetch all offers at once
  const apiUrl = 'http://localhost:1337/api/nieruchomosci-2s?populate=*&sort=createdAt:desc';
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      allOffers = data.data;
      displayOffers(initialDisplayCount);
      currentDisplayedCount = initialDisplayCount;
      if (currentDisplayedCount >= allOffers.length) {
        showNoMoreNotification();
      }
    })
    .catch(error => console.error('Error fetching offers:', error));
  
  // Function to display next "count" offers from allOffers
  function displayOffers(count) {
    const offersToDisplay = allOffers.slice(currentDisplayedCount, currentDisplayedCount + count);
    offersToDisplay.forEach((offer, index) => {
      const tagText = offer.Typ || "Sprzedaż";
      const title = offer.Tytul || "Oferta";
      const cena = offer.Cena ? offer.Cena.toLocaleString() : "";
      const cenaPerM2 = offer.Cena_Per_Metr2 ? offer.Cena_Per_Metr2 + " PLN/m²" : "";
      const area = offer.powierzchnia ? offer.powierzchnia + " m²" : "";
      
      // Build carousel slides from Galeria array
      let carouselSlides = "";
      if (offer.Galeria && offer.Galeria.length > 0) {
        offer.Galeria.forEach((photo, idx) => {
          let imgUrl = photo.url;
          if (imgUrl.startsWith('/')) {
            imgUrl = 'http://localhost:1337' + imgUrl;
          }
          carouselSlides += `
            <div class="carousel-item${idx === 0 ? ' active' : ''}">
              <img src="${imgUrl}" class="d-block w-100" alt="${title} - Zdjęcie ${idx + 1}">
            </div>
          `;
        });
      } else {
        carouselSlides = `
          <div class="carousel-item active">
            <img src="/assets/img/placeholder.jpg" class="d-block w-100" alt="Brak zdjęcia">
          </div>
        `;
      }
      
      // Use currentDisplayedCount + index to create a unique carousel id.
      const carouselId = `carouselNier${currentDisplayedCount + index + 1}`;
      
      const cardHTML = `
        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12 mb-4">
          <div class="card custom-card position-relative">
            <!-- Tag -->
            <span class="p-2 bg-dark text-white position-absolute top-0 end-0 z-2 text-uppercase">${tagText}</span>
            <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
              <div class="carousel-inner">
                ${carouselSlides}
              </div>
              <!-- Carousel Controls -->
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Poprzedni</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Następny</span>
              </button>
            </div>
            <div class="card-body text-center">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">
                ${cena} PLN | ${area} | ${cenaPerM2}
              </p>
              <a href="#" class="offer-details" data-offer-id="${offer.id}" data-bs-toggle="modal" data-bs-target="#realEstateModal">
                Dowiedź więcej <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      `;
      offersRow.insertAdjacentHTML('beforeend', cardHTML);
    });
  }
  
  // Function to show notification with fade in/out effect
  function showNoMoreNotification() {
    noMoreOffersDiv.classList.add('show');
    setTimeout(() => {
      noMoreOffersDiv.classList.remove('show');
    }, 5000);
  }
  
  // Event listener for the "ZOBACZ WSZYSTKIE" button
  loadMoreButton.addEventListener('click', (e) => {
    e.preventDefault();
    const remaining = allOffers.length - currentDisplayedCount;
    if (remaining > 0) {
      const countToShow = Math.min(additionalCount, remaining);
      displayOffers(countToShow);
      currentDisplayedCount += countToShow;
    }
    if (currentDisplayedCount >= allOffers.length) {
      showNoMoreNotification();
    }
  });
  
  // Event delegation for opening modal details
  document.body.addEventListener('click', function(event) {
    if (event.target.closest('.offer-details')) {
      const link = event.target.closest('.offer-details');
      const offerId = link.getAttribute('data-offer-id');
      const offer = allOffers.find(o => o.id == offerId);
      if (offer) {
        populateModal(offer);
      }
    }
  });
  
  // Function to populate modal content dynamically
  function populateModal(offer) {
    let modalHtml = '';
    let modalCarouselSlides = "";
    if (offer.Galeria && offer.Galeria.length > 0) {
      offer.Galeria.forEach((photo, idx) => {
        let imgUrl = photo.url;
        if (imgUrl.startsWith('/')) {
          imgUrl = 'http://localhost:1337' + imgUrl;
        }
        modalCarouselSlides += `
          <div class="carousel-item${idx === 0 ? ' active' : ''}">
            <img src="${imgUrl}" class="d-block w-100" alt="${offer.Tytul} - Zdjęcie ${idx + 1}">
          </div>
        `;
      });
    } else {
      modalCarouselSlides = `
        <div class="carousel-item active">
          <img src="/assets/img/placeholder.jpg" class="d-block w-100" alt="Brak zdjęcia">
        </div>
      `;
    }
    
    modalHtml += `
      <!-- Carousel Section -->
      <div id="modalCarousel" class="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="4000">
        <div class="carousel-inner">
          ${modalCarouselSlides}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#modalCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Poprzedni</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#modalCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Następny</span>
        </button>
      </div>
      
      <!-- Price and Main Title -->
      <div class="mt-2 p-3 d-flex justify-content-between align-items-center bg-light rounded">
        <h2 class="fw-bold mb-0 text-accent2">
          <i class="bi bi-tag me-2"></i> Cena: ${offer.Cena ? offer.Cena.toLocaleString() + ' PLN' : ''}
        </h2>
        <h3 class="mb-0 text-secondary">${offer.Cena_Per_Metr2 ? offer.Cena_Per_Metr2 + ' PLN/m<sup>2</sup>' : ''}</h3>
      </div>
      
      <!-- Main Description -->
      <section class="p-0 my-2">
        <p class="fw-bold text-uppercase">${offer.Tytul}</p>
        <p>${offer.Opis || ''}</p>
      </section>
      
      <!-- Contact Details -->
      <section class="p-0">
        <h5 class="mb-2">Poznaj więcej szczegółów!</h5>
        <p class="fs-5">
          Skontaktuj się<br>
          <i class="bi bi-telephone me-2"></i><strong>+48 609 900 364</strong><br>
          <i class="bi bi-envelope me-2"></i><strong>m.jurewicz@mengs.pl</strong>
        </p>
      </section>
    `;
    
    document.getElementById('modalContent').innerHTML = modalHtml;
    document.getElementById('realEstateModalLabel').innerText = offer.Tytul || "Oferta";
  }
});