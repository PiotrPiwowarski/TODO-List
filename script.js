let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newToDo;
const toolsClass = 'tools';
const taskError = 'Nie można dodać pustego zadania';
const noTasks = 'Brak zadań na liście';

let popup;
let popupInfo;
let todoEdit;
let popupInput;
let popupAddBtn;
let popupCancelBtn;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
}

const prepareDOMElements = () => {
  todoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  addBtn = document.querySelector('.btn-add');
  ulList = document.querySelector('ul');

  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  popupAddBtn = document.querySelector('.accept');
  popupCancelBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
  addBtn.addEventListener('click', (e) => addNewToDo(e));
  todoInput.addEventListener('keydown', (e) => addNewToDo(e));
  ulList.addEventListener('click', (e) => checkClick(e));
}

const addNewToDo = (e) => {
  if(e.keyCode !== 13 && e.type === 'keydown') {
    return;
  }
  if(todoInput.value.length === 0) {
    errorInfo.style.color = 'red';
    errorInfo.textContent = taskError;
    return;
  } else {
    errorInfo.textContent = '';
  }

  newToDo = document.createElement('li');
  newToDo.textContent = todoInput.value;

  createTools(newToDo);

  ulList.appendChild(newToDo);
  todoInput.value = '';
}

const createTools = () => {
  const div = document.createElement('div');
  div.className = toolsClass;
  newToDo.appendChild(div);

  const completeButton = document.createElement('button');
  completeButton.className = 'complete';
  completeButton.textContent = 'COMPLETE';
  div.appendChild(completeButton);

  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'EDIT';
  div.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'DELETE';
  div.appendChild(deleteButton);
}

const checkClick = e => {
  if(e.target.matches('.complete')) {
    completeDodo(e);
  } else if(e.target.matches('.edit')) {
    editTodo(e);
  } else if(e.target.matches('.delete')) {
    deleteTodo(e);
  }
}

const completeDodo = (e) => {
  e.target.closest('li').classList.toggle('completed');
  e.target.classList.toggle('completed');
}

const editTodo = (e) => {
  popup.style.display = 'flex';
  todoEdit = e.target.closest('li');
  popupInput.value = todoEdit.firstChild.textContent;

  popupCancelBtn.addEventListener('click', closePopup);
  popupAddBtn.addEventListener('click', e => acceptEdit(e));
  popup.addEventListener('keydown', e => acceptEdit(e));
}

const acceptEdit = (e) => {
  if((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
    if(popupInput.value.length !== 0) {
      todoEdit.firstChild.textContent = popupInput.value;
      closePopup();
    } else {
      popupInfo.textContent = taskError;
    }
  }
}

const closePopup = () => {
  popup.style.display = 'none';
}

const deleteTodo = (e) => {
  e.target.closest('li').remove();
  if(ulList.querySelectorAll('li').length === 0) {
    errorInfo.textContent = noTasks;
  }
}

document.addEventListener('DOMContentLoaded', main);