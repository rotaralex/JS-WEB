const catalog = new Map();
const orders = new Set();
 
const changeHistory = new WeakMap();
const premiumProducts = new WeakSet();
 
let nextId = 1;   
let orderNum = 1; 
 
function showMsg(id, text, isOk = true) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className   = isOk ? 'msg-ok' : 'msg-err';
  setTimeout(() => { el.textContent = ''; }, 3000);
}
 
function renderCatalog() {
  const tbody = document.getElementById('catalog-body');
  tbody.innerHTML = '';
 
  if (catalog.size === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:gray">Каталог порожній</td></tr>';
    return;
  }
 
  catalog.forEach((prod) => {
    const isPremium = premiumProducts.has(prod) ? ' ' : '';
    const row = document.createElement('tr');
    row.innerHTML =
      `<td>${prod.id}</td>` +
      `<td>${prod.name}${isPremium}</td>` +
      `<td>${prod.price}</td>` +
      `<td>${prod.qty}</td>` +
      `<td>
        <button onclick="editInline(${prod.id})"> Ред.</button>
        <button onclick="quickDelete(${prod.id})"> Видалити</button>
      </td>`;
    tbody.appendChild(row);
  });
}
 
function renderOrders() {
  const tbody = document.getElementById('orders-body');
  tbody.innerHTML = '';
  let i = 1;
  orders.forEach((order) => {
    const row = document.createElement('tr');
    row.innerHTML =
      `<td>${i++}</td><td>${order.productName} (ID ${order.productId})</td>` +
      `<td>${order.qty}</td><td>${order.total} грн</td>`;
    tbody.appendChild(row);
  });
  if (orders.size === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:gray">Замовлень немає</td></tr>';
  }
}
 

function addProduct() {
  const name  = document.getElementById('prod-name').value.trim();
  const price = parseFloat(document.getElementById('prod-price').value);
  const qty   = parseInt(document.getElementById('prod-qty').value, 10);
 
  if (!name)           return showMsg('add-msg', 'Введіть назву!', false);
  if (isNaN(price) || price < 0) return showMsg('add-msg', 'Введіть коректну ціну!', false);
  if (isNaN(qty)   || qty   < 0) return showMsg('add-msg', 'Введіть коректну кількість!', false);
 
  const prod = { id: nextId++, name, price, qty };
 
  catalog.set(prod.id, prod);
 
  changeHistory.set(prod, [`[${new Date().toLocaleString('uk-UA')}] Створено: назва="${name}", ціна=${price}, кількість=${qty}`]);
 
  
  if (price > 1000) premiumProducts.add(prod);
 
  document.getElementById('prod-name').value  = '';
  document.getElementById('prod-price').value = '';
  document.getElementById('prod-qty').value   = '';
 
  showMsg('add-msg', ` Продукт "${name}" додано (ID: ${prod.id})`);
  renderCatalog();
}
 
function deleteProduct() {
  const id = parseInt(document.getElementById('del-id').value, 10);
  quickDelete(id, 'del-msg');
}
 
function quickDelete(id, msgId = 'del-msg') {
  if (!catalog.has(id)) return showMsg(msgId, `Продукт ID ${id} не знайдено!`, false);
  const prod = catalog.get(id);
  catalog.delete(id);
  showMsg(msgId, ` Продукт "${prod.name}" видалено.`);
  renderCatalog();
}
 
function updateProduct()
 {
  const id    = parseInt(document.getElementById('upd-id').value, 10);
  const price = document.getElementById('upd-price').value;
  const qty   = document.getElementById('upd-qty').value;
 
  if (!catalog.has(id)) return showMsg('upd-msg', `Продукт ID ${id} не знайдено!`, false);
 
  const prod    = catalog.get(id);
  const changes = [];
 
  if (price !== '' && !isNaN(+price) && +price >= 0) {
    changes.push(`ціна: ${prod.price} → ${+price}`);
    prod.price = +price;
    if (prod.price > 1000) premiumProducts.add(prod);
  }
  if (qty !== '' && !isNaN(+qty) && +qty >= 0) {
    changes.push(`кількість: ${prod.qty} → ${+qty}`);
    prod.qty = +qty;
  }
 
  if (changes.length === 0) return showMsg('upd-msg', 'Нічого не змінено.', false);
 
  if (changeHistory.has(prod)) {
    changeHistory.get(prod).push(
      `[${new Date().toLocaleString('uk-UA')}] Оновлено: ${changes.join('; ')}`
    );
  }
 
  showMsg('upd-msg', ` Продукт ID ${id} оновлено.`);
  renderCatalog();
}
 
function editInline(id) {
  const prod = catalog.get(id);
  if (!prod) return;
  document.getElementById('upd-id').value    = prod.id;
  document.getElementById('upd-price').value = prod.price;
  document.getElementById('upd-qty').value   = prod.qty;
  document.getElementById('upd-id').scrollIntoView({ behavior: 'smooth' });
}
 

function searchProduct()
 {
  const query  = document.getElementById('search-input').value.trim().toLowerCase();
  const result = document.getElementById('search-result');
  if (!query) { result.innerHTML = ''; return; }
 
  const found = [];
  catalog.forEach((prod) => {
    if (prod.name.toLowerCase().includes(query)) found.push(prod);
  });
 
  if (found.length === 0) {
    result.innerHTML = '<span style="color:red">Нічого не знайдено.</span>';
    return;
  }
 
  let html = '<table><tr><th>ID</th><th>Назва</th><th>Ціна</th><th>Кількість</th><th>Преміум?</th></tr>';
  found.forEach(p => {
    html += `<tr><td>${p.id}</td><td>${p.name}</td><td>${p.price} грн</td><td>${p.qty}</td>` +
            `<td>${premiumProducts.has(p) ? '⭐ Так' : 'Ні'}</td></tr>`;
  });
  html += '</table>';
  result.innerHTML = html;
}
 
function placeOrder() {
  const id  = parseInt(document.getElementById('order-id').value,  10);
  const qty = parseInt(document.getElementById('order-qty').value, 10);
 
  if (!catalog.has(id))      return showMsg('order-msg', `Продукт ID ${id} не знайдено!`, false);
  if (isNaN(qty) || qty <= 0) return showMsg('order-msg', 'Введіть коректну кількість!', false);
 
  const prod = catalog.get(id);
  if (prod.qty < qty) return showMsg('order-msg', `Недостатньо товару! На складі: ${prod.qty}`, false);
 
  prod.qty -= qty;
 
  const order = {
    num: orderNum++,
    productId:   prod.id,
    productName: prod.name,
    qty,
    total: +(prod.price * qty).toFixed(2)
  };
  orders.add(order);
 
  if (changeHistory.has(prod)) {
    changeHistory.get(prod).push(
      `[${new Date().toLocaleString('uk-UA')}] Замовлення: -${qty} шт. (залишок: ${prod.qty})`
    );
  }
 
  showMsg('order-msg', ` Замовлення на "${prod.name}" × ${qty} шт. оформлено. Сума: ${order.total} грн`);
  renderCatalog();
  renderOrders();
}
 
function showHistory() {
  const id   = parseInt(document.getElementById('hist-id').value, 10);
  const list = document.getElementById('history-list');
  list.innerHTML = '';
 
  if (!catalog.has(id)) {
    list.innerHTML = '<li style="color:red">Продукт не знайдено.</li>';
    return;
  }
 
  const prod    = catalog.get(id);
  const history = changeHistory.get(prod); 
 
  if (!history || history.length === 0) {
    list.innerHTML = '<li>Історія порожня.</li>';
    return;
  }
 
  history.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = entry;
    list.appendChild(li);
  });
}
 
(function seed() {
  const samples = [
    { name: 'Ноутбук ASUS',  price: 25000, qty: 5 },
    { name: 'Мишка Logitech',price: 450,   qty: 30 },
    { name: 'Клавіатура',    price: 1200,  qty: 15 },
    { name: 'Монітор 27"',   price: 8500,  qty: 8  },
  ];
  samples.forEach(s => {
    const prod = { id: nextId++, name: s.name, price: s.price, qty: s.qty };
    catalog.set(prod.id, prod);
    changeHistory.set(prod, [
      `[${new Date().toLocaleString('uk-UA')}] Створено: назва="${s.name}", ціна=${s.price}, кількість=${s.qty}`
    ]);
    if (s.price > 1000) premiumProducts.add(prod);
  });
  renderCatalog();
  renderOrders();
})();
 