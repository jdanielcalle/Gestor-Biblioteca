import { getDOMReferences, anyEmptyField, messageSuccessOperation, deleteRow, validateRows, createRow, attachDeleteListener, constructData } from './utilFunctions.js';

const type = 'usuario';

document.addEventListener('DOMContentLoaded', () => {

    const { usersTableContent, userListEmptyContent } = getDOMReferences(type);
    validateRows(usersTableContent, userListEmptyContent, type);
});

const { userNameInput, userEmailInput, birthDateInput, addUserBtn, usersTableContent, userListEmptyContent } = getDOMReferences(type);

let userListCount = 0;

addUserBtn.addEventListener('click', () => {
    const userData = constructData(type, userNameInput.value, userEmailInput.value, birthDateInput.value);
    if (anyEmptyField(userData)) {
      return;
    }
    validateRows(usersTableContent, userListEmptyContent, type);

    userListCount++;
    
    const userFields = ['name', 'email', 'birthDate'];
    const newRow = createRow(userData, userListCount, userFields);

    usersTableContent.appendChild(newRow);

    validateRows(usersTableContent, userListEmptyContent, type);
    attachDeleteListener(newRow);
    messageSuccessOperation('Usuario agregado con éxito');
});

usersTableContent.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
      const rowToDelete = event.target.closest('tr');
      deleteRow(rowToDelete);
      validateRows(usersTableContent, userListEmptyContent, type);
  }
});