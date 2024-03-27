import { getDOMReferences, anyEmptyField, messageSuccessOperation, deleteRow, validateRows, createRow, attachDeleteListener, constructData } from './utilFunctions.js';

const type = 'libro';

document.addEventListener('DOMContentLoaded', () => {
    const { booksTableContent, bookListEmptyContent } = getDOMReferences(type);
    validateRows(booksTableContent, bookListEmptyContent, type);
});

const { bookTitleInput, bookAuthorInput, bookEditorialInput, bookCategoryInput, bookPublicationDateInput, addBookBtn, booksTableContent, bookListEmptyContent } = getDOMReferences(type);

let bookListCount = 0;

addBookBtn.addEventListener('click', () => {
    console.log(bookEditorialInput.value, bookTitleInput.value);
    const bookData = constructData(type, bookTitleInput.value, bookAuthorInput.value, bookEditorialInput.value, bookCategoryInput.value, bookPublicationDateInput.value);
    
    if (anyEmptyField(bookData)) {
        return;
    }

    validateRows(booksTableContent, bookListEmptyContent, type);

    bookListCount++;
    
    const bookFields = ['title', 'author', 'editorial', 'category', 'publicationDate'];
    const newRow = createRow(bookData, bookListCount, bookFields);

    booksTableContent.appendChild(newRow);

    validateRows(booksTableContent, bookListEmptyContent, type);
    attachDeleteListener(newRow);
    messageSuccessOperation('Libro agregado con éxito');
});

booksTableContent.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const rowToDelete = event.target.closest('tr');
        deleteRow(rowToDelete);
        validateRows(booksTableContent, bookListEmptyContent, type);
    }
});