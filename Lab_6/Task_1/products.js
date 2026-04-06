function createProduct(name, price, category, img) {
  return {
    id: 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    name: name,
    price: parseFloat(price),
    category: category,
    img: img || 'https://picsum.photos/seed/' + encodeURIComponent(name) + '/400/300',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function updateProduct(product, name, price, category, img) {
  return {
    ...product,
    name: name,
    price: parseFloat(price),
    category: category,
    img: img || product.img,
    updatedAt: new Date().toISOString(),
  };
}

function removeProduct(products, id) {
  return products.filter(function(p) { return p.id !== id; });
}

function filterByCategory(products, category) {
  if (!category) return products;
  return products.filter(function(p) { return p.category === category; });
}

function sortProducts(products, key) {
  if (!key) return products;
  return [...products].sort(function(a, b) {
    if (key === 'price')   return a.price - b.price;
    if (key === 'created') return new Date(a.createdAt) - new Date(b.createdAt);
    if (key === 'updated') return new Date(b.updatedAt) - new Date(a.updatedAt);
    return 0;
  });
}

function calcTotal(products) {
  return products.reduce(function(sum, p) { return sum + p.price; }, 0).toFixed(2);
}

function getCategories(products) {
  return [...new Set(products.map(function(p) { return p.category; }))];
}

function formatPrice(price) {
  return parseFloat(price).toFixed(2) + ' \u20B4';
}

var state = {
  products: [
    createProduct('Навушники Sony', 2999, 'Електроніка', 'https://picsum.photos/seed/sony/400/300'),
    createProduct('Футболка біла', 450, 'Одяг', 'https://picsum.photos/seed/shirt/400/300'),
    createProduct('Clean Code', 380, 'Книги', 'https://picsum.photos/seed/book1/400/300'),
    createProduct('Кросівки Adidas', 3200, 'Спорт', 'https://picsum.photos/seed/adidas/400/300'),
    createProduct('Настільна лампа', 890, 'Дім', 'https://picsum.photos/seed/lamp/400/300'),
  ],
  filterCategory: '',
  sortKey: '',
  editingId: null,
};

function showToast(message, type) {
  var container = document.getElementById('toast-container');
  var toast = document.createElement('div');
  toast.className = 'toast' + (type === 'danger' ? ' danger' : '');
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(function() {
    toast.remove();
  }, 3000);
}

function openModal(title, product) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('f-name').value     = product ? product.name     : '';
  document.getElementById('f-price').value    = product ? product.price    : '';
  document.getElementById('f-category').value = product ? product.category : '';
  document.getElementById('f-img').value      = product ? product.img      : '';
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('product-form').reset();
  state.editingId = null;
}

function buildProductCard(product) {
  var card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.innerHTML =
    '<img src="' + product.img + '" alt="' + product.name + '">' +
    '<div class="card-info">' +
      '<div class="card-id">ID: ' + product.id + '</div>' +
      '<h3>' + product.name + '</h3>' +
      '<div class="price">' + formatPrice(product.price) + '</div>' +
      '<span class="category">' + product.category + '</span>' +
    '</div>' +
    '<div class="card-actions">' +
      '<button class="btn-edit" data-id="' + product.id + '">Редагувати</button>' +
      '<button class="btn-delete" data-id="' + product.id + '">Видалити</button>' +
    '</div>';
  return card;
}

function renderPage() {
  var filtered = filterByCategory(state.products, state.filterCategory);
  var sorted   = sortProducts(filtered, state.sortKey);

  document.getElementById('total-price').textContent = formatPrice(calcTotal(state.products));

  // Кнопки фільтрів
  var filterContainer = document.getElementById('filter-btns');
  filterContainer.innerHTML = '';
  getCategories(state.products).forEach(function(cat) {
    var btn = document.createElement('button');
    btn.textContent = cat;
    if (state.filterCategory === cat) btn.className = 'active';
    btn.addEventListener('click', function() {
      state.filterCategory = state.filterCategory === cat ? '' : cat;
      renderPage();
    });
    filterContainer.appendChild(btn);
  });
  var resetFilterBtn = document.createElement('button');
  resetFilterBtn.textContent = 'Всі';
  resetFilterBtn.addEventListener('click', function() {
    state.filterCategory = '';
    renderPage();
  });
  filterContainer.appendChild(resetFilterBtn);

  // Активна кнопка сортування
  document.querySelectorAll('.sort-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.sort === state.sortKey);
  });

  // Порожній список
  document.getElementById('empty-msg').style.display = sorted.length === 0 ? 'block' : 'none';

  // Картки
  var grid = document.getElementById('products-grid');
  grid.innerHTML = '';
  sorted.forEach(function(product) {
    grid.appendChild(buildProductCard(product));
  });
}

document.getElementById('btn-add').addEventListener('click', function() {
  state.editingId = null;
  openModal('Новий товар', null);
});

document.getElementById('btn-close-modal').addEventListener('click', closeModal);

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

document.getElementById('product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var name     = document.getElementById('f-name').value.trim();
  var price    = document.getElementById('f-price').value;
  var category = document.getElementById('f-category').value;
  var img      = document.getElementById('f-img').value.trim();
  if (!name || !price || !category) return;

  if (state.editingId) {
    state.products = state.products.map(function(p) {
      return p.id === state.editingId ? updateProduct(p, name, price, category, img) : p;
    });
    showToast('Товар "' + name + '" оновлено (id: ' + state.editingId + ')');
  } else {
    state.products = [...state.products, createProduct(name, price, category, img)];
    showToast('Товар "' + name + '" додано');
  }

  closeModal();
  renderPage();
});

document.getElementById('products-grid').addEventListener('click', function(e) {
  var editBtn   = e.target.closest('.btn-edit');
  var deleteBtn = e.target.closest('.btn-delete');

  if (editBtn) {
    var id = editBtn.dataset.id;
    var product = state.products.find(function(p) { return p.id === id; });
    if (product) {
      state.editingId = id;
      openModal('Редагувати товар', product);
    }
  }

  if (deleteBtn) {
    var id = deleteBtn.dataset.id;
    var product = state.products.find(function(p) { return p.id === id; });
    var card = document.querySelector('[data-id="' + id + '"]');
    if (card) {
      card.classList.add('removing');
      setTimeout(function() {
        state.products = removeProduct(state.products, id);
        showToast('"' + product.name + '" видалено зі списку', 'danger');
        renderPage();
      }, 300);
    }
  }
});

document.querySelectorAll('.sort-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    state.sortKey = state.sortKey === btn.dataset.sort ? '' : btn.dataset.sort;
    renderPage();
  });
});

document.getElementById('btn-reset-sort').addEventListener('click', function() {
  state.sortKey = '';
  renderPage();
});

renderPage();
