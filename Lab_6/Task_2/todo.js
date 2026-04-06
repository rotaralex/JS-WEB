function createTask(text) {
  return {
    id: 'task_' + Date.now() + '_' + Math.random().toString(36).slice(2, 5),
    text: text.trim(),
    done: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function toggleTaskDone(task) {
  return { ...task, done: !task.done, updatedAt: new Date().toISOString() };
}

function updateTaskText(task, newText) {
  return { ...task, text: newText.trim(), updatedAt: new Date().toISOString() };
}

function removeTask(tasks, id) {
  return tasks.filter(function(t) { return t.id !== id; });
}

function sortTasks(tasks, key) {
  if (!key) return tasks;
  return [...tasks].sort(function(a, b) {
    if (key === 'created') return new Date(a.createdAt) - new Date(b.createdAt);
    if (key === 'updated') return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (key === 'status')  return Number(a.done) - Number(b.done);
    return 0;
  });
}

function formatDate(iso) {
  var d = new Date(iso);
  return d.toLocaleString('uk-UA', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

function buildStats(tasks) {
  var done = tasks.filter(function(t) { return t.done; }).length;
  return tasks.length + ' завдань | ' + done + ' виконано';
}

var state = {
  tasks: [
    createTask('Прочитати про DOM в JavaScript'),
    createTask('Виконати лабораторну роботу №6'),
    Object.assign(createTask('Зробити каву'), { done: true }),
  ],
  sortKey: '',
  editingId: null,
};

function buildTaskItem(task) {
  var li = document.createElement('li');
  li.className = 'todo-item' + (task.done ? ' done' : '');
  li.dataset.id = task.id;

  var isEditing = state.editingId === task.id;

  var checkDiv = '<div class="todo-check ' + (task.done ? 'checked' : '') + '" data-action="toggle" data-id="' + task.id + '">' + (task.done ? '✓' : '') + '</div>';

  var textBlock;
  if (isEditing) {
    textBlock = '<input class="todo-edit-input" id="edit-' + task.id + '" type="text" value="' + task.text.replace(/"/g, '&quot;') + '" required minlength="2" maxlength="200">';
  } else {
    textBlock = '<div class="todo-text" data-action="toggle" data-id="' + task.id + '">' + task.text + '</div>';
  }

  var actionBtn;
  if (isEditing) {
    actionBtn = '<button class="btn-save" data-action="save" data-id="' + task.id + '" title="Зберегти">💾</button>';
  } else {
    actionBtn = '<button class="btn-edit" data-action="edit" data-id="' + task.id + '" title="Редагувати">✏️</button>';
  }

  li.innerHTML =
    checkDiv +
    '<div class="todo-text-wrap">' +
      textBlock +
      '<div class="todo-meta">Додано: ' + formatDate(task.createdAt) + ' · Оновлено: ' + formatDate(task.updatedAt) + '</div>' +
    '</div>' +
    '<div class="todo-actions">' +
      actionBtn +
      '<button class="btn-del" data-action="delete" data-id="' + task.id + '" title="Видалити">🗑</button>' +
    '</div>';

  return li;
}

function renderPage() {
  var sorted = sortTasks(state.tasks, state.sortKey);

  document.getElementById('stats').textContent = buildStats(state.tasks);

  document.querySelectorAll('.sort-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.sort === state.sortKey);
  });

  var list = document.getElementById('todo-list');
  list.innerHTML = '';

  if (sorted.length === 0) {
    var empty = document.createElement('p');
    empty.className = 'empty-msg';
    empty.textContent = 'Список порожній. Додайте перше завдання!';
    list.appendChild(empty);
    return;
  }

  sorted.forEach(function(task) {
    var li = buildTaskItem(task);
    list.appendChild(li);

    if (state.editingId === task.id) {
      var input = document.getElementById('edit-' + task.id);
      if (input) {
        input.focus();
        input.addEventListener('keydown', function(e) {
          if (e.key === 'Enter')  saveEdit(task.id, input.value);
          if (e.key === 'Escape') cancelEdit();
        });
      }
    }
  });
}

function saveEdit(id, value) {
  if (!value || value.trim().length < 2) return;
  state.tasks = state.tasks.map(function(t) {
    return t.id === id ? updateTaskText(t, value) : t;
  });
  state.editingId = null;
  renderPage();
}

function cancelEdit() {
  state.editingId = null;
  renderPage();
}

document.getElementById('add-form').addEventListener('submit', function(e) {
  e.preventDefault();
  var input = document.getElementById('new-task');
  var text  = input.value.trim();
  if (text.length < 2) return;
  state.tasks = [...state.tasks, createTask(text)];
  input.value = '';
  renderPage();
});

document.getElementById('todo-list').addEventListener('click', function(e) {
  var target = e.target.closest('[data-action]');
  if (!target) return;

  var action = target.dataset.action;
  var id     = target.dataset.id;

  if (action === 'toggle') {
    state.tasks = state.tasks.map(function(t) {
      return t.id === id ? toggleTaskDone(t) : t;
    });
    renderPage();
  }

  if (action === 'edit') {
    state.editingId = id;
    renderPage();
  }

  if (action === 'save') {
    var input = document.getElementById('edit-' + id);
    if (input) saveEdit(id, input.value);
  }

  if (action === 'delete') {
    var item = document.querySelector('.todo-item[data-id="' + id + '"]');
    if (item) {
      item.classList.add('removing');
      setTimeout(function() {
        state.tasks = removeTask(state.tasks, id);
        if (state.editingId === id) state.editingId = null;
        renderPage();
      }, 250);
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
