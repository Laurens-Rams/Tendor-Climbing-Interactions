const climbingProducts = [
  {
    imageSrc: 'data/climbing-product-1.png',
    price: '15',
    translations: {
      en: {
        title: 'Ergonomic Climbing Harness',
        description: 'A comfortable and secure harness designed for prolonged climbing sessions, featuring adjustable straps for a perfect fit.'
      },
      es: {
        title: 'Arnés de Escalada Ergonómico',
        description: 'Un arnés cómodo y seguro, diseñado para sesiones de escalada prolongadas, con correas ajustables para un ajuste perfecto.'
      }
    }
  },
  {
    imageSrc: 'data/climbing-product-2.png',
    price: '20',
    translations: {
      en: {
        title: 'Advanced Grip Climbing Shoes',
        description: 'High-performance shoes offering superior grip and flexibility, ideal for challenging climbs and bouldering.'
      },
      es: {
        title: 'Zapatos de Escalada de Agarre Avanzado',
        description: 'Zapatos de alto rendimiento que ofrecen un agarre superior y flexibilidad, ideales para escaladas desafiantes y boulder.'
      }
    }
  },
  {
    imageSrc: 'data/climbing-product-3.png',
    price: '45',
    translations: {
      en: {
        title: 'Ultra-Light Quickdraw Set',
        description: 'A set of 6 ultra-light quickdraws, perfect for sport climbing. Durable, reliable, and designed for quick clipping.'
      },
      es: {
        title: 'Juego de Cintas Exprés Ultraligeras',
        description: 'Un conjunto de 6 cintas exprés ultraligeras, perfectas para la escalada deportiva. Duraderas, fiables y diseñadas para un enganche rápido.'
      }
    }
  },
  {
    imageSrc: 'data/climbing-product-4.png',
    price: '120',
    translations: {
      en: {
        title: 'Professional Climbing Helmet',
        description: 'Highly durable and comfortable climbing helmet with enhanced ventilation. Ideal for all types of climbing.'
      },
      es: {
        title: 'Casco de Escalada Profesional',
        description: 'Casco de escalada muy duradero y cómodo con ventilación mejorada. Ideal para todo tipo de escalada.'
      }
    }
  },
  {
    imageSrc: 'data/climbing-product-5.png',
    price: '99',
    translations: {
      en: {
        title: 'Multi-Pitch Climbing Backpack',
        description: 'A lightweight and compact backpack designed for multi-pitch routes. Features easy access pockets and a sleek design.'
      },
      es: {
        title: 'Mochila de Escalada de Varios Largos',
        description: 'Una mochila ligera y compacta diseñada para rutas de varios largos. Cuenta con bolsillos de fácil acceso y un diseño elegante.'
      }
    }
  },
  {
    imageSrc: 'data/climbing-product-6.png',
    price: '60',
    translations: {
      en: {
        title: 'Climbing Training Hangboard',
        description: 'Ergonomic hangboard for strength training. Offers various holds to improve grip strength and endurance.'
      },
      es: {
        title: 'Tabla de Entrenamiento para Escalada',
        description: 'Tabla ergonómica para entrenamiento de fuerza. Ofrece varios agarres para mejorar la fuerza de agarre y la resistencia.'
      }
    }
  }
];

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('sortTitleBtn').addEventListener('click', sortByTitle);
  document.getElementById('addNewProduct').addEventListener('click', addNewProduct);
  
  document.getElementById('sortPriceBtn').addEventListener('click', sortByPrice);
  document.getElementById('searchInput').addEventListener('input', searchProducts);


  document.getElementById('sortTitleBtn').textContent = 'Sort by Title ↓';
  document.getElementById('sortPriceBtn').textContent = 'Sort by Price ↓';

  renderEventsGrid(climbingProducts);
});

document.getElementById('searchInput').addEventListener('input', searchProducts);
let isTitleSortedAscending = true;
let isPriceSortedAscending = true;

function sortByTitle() {
  const currentLang = document.getElementById('languageSelect').value || 'en';
  climbingProducts.sort((a, b) => isTitleSortedAscending 
    ? a.translations[currentLang].title.localeCompare(b.translations[currentLang].title) 
    : b.translations[currentLang].title.localeCompare(a.translations[currentLang].title));
  isTitleSortedAscending = !isTitleSortedAscending;
  document.getElementById('sortTitleBtn').textContent = `Sort by Title ${isTitleSortedAscending ? '↓' : '↑'}`;
  renderEventsGrid(climbingProducts, currentLang);
}

function sortByPrice() {
  const currentLang = document.getElementById('languageSelect').value || 'en';
  climbingProducts.sort((a, b) => isPriceSortedAscending ? a.price - b.price : b.price - a.price);
  isPriceSortedAscending = !isPriceSortedAscending;

  document.getElementById('sortPriceBtn').textContent = `Sort by Price ${isPriceSortedAscending ? '↓' : '↑'}`;
  renderEventsGrid(climbingProducts, currentLang);
}

function searchProducts() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const currentLang = document.getElementById('languageSelect').value || 'en';
  const filteredProducts = climbingProducts.filter(product => 
    product.translations[currentLang].title.toLowerCase().includes(searchQuery)
  );
  renderEventsGrid(filteredProducts, currentLang);
}

function addNewProduct() {
  const productName = document.getElementById('newProductName').value;
  const productPrice = document.getElementById('newProductPrice').value;
  const productImage = document.getElementById('newProductImage').value;
  const productDescription = document.getElementById('newProductDescription').value;

  const newProduct = {
    title: productName,
    price: productPrice,
    imageSrc: productImage,
    description: productDescription
  };

  climbingProducts.push(newProduct);
  renderEventsGrid(climbingProducts);
  closePopup();
}

document.getElementById('addProductBtn').addEventListener('click', function() {
  document.getElementById('productPopup').style.display = 'block';
});

document.getElementById('languageSelect').addEventListener('change', function() {
  const selectedLang = this.value;
  renderEventsGrid(climbingProducts, selectedLang);
});

function closePopup() {
  document.getElementById('productPopup').style.display = 'none';
}


function renderEventsGrid(products, lang = 'en') {
  const eventsGrid = document.getElementById('eventsGrid');
  eventsGrid.innerHTML = '';
  products.forEach(product => {
    const translation = product.translations[lang];
    const eventCard = document.createElement('div');
    eventCard.className = 'product-card relative bg-slate-300 shadow-lg rounded-lg overflow-hidden mb-6';
    eventCard.innerHTML = `
      <div class="flex items-center justify-center text-black text-s uppercase font-bold rounded-full px-6 opacity-80 py-3 bg-slate-100 absolute top-4 left-4">
        <span>${product.price}</span>
        <span class="font-normal">€</span>
      </div>
      <img class="w-full h-48 object-cover object-center" src="${product.imageSrc}" alt="Product Image">
      <div class="absolute top-4 right-4 flex space-x-2">
        <button class="bg-white p-2 rounded-full shadow flex items-center justify-center">
          <img src="data/share.png" alt="Share" class="h-4 w-4"> <!-- Size can be adjusted -->
        </button>
        <button class="bg-white p-2 rounded-full shadow flex items-center justify-center">
          <img src="data/hearth.png" alt="Heart" class="h-4 w-4"> <!-- Size can be adjusted -->
        </button>
      </div>
      <div class="p-6">
        <div class="mb-5">
          <div class="flex items-center">
            <div class="flex flex-col">
              <h2 class="text-lg font-bold text-slate-900">${translation.title}</h2>
              <div class="text-sm text-slate-900">${translation.description}</div>
            </div>
          </div>
        </div>
      </div>
    `;
    eventsGrid.appendChild(eventCard);
  });
}