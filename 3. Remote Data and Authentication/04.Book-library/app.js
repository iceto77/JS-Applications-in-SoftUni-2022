const url = 'http://localhost:3030/jsonstore/collections/books';
const loadBooksBtnElement = document.getElementById('loadBooks');
const tableElement = document.querySelector('tbody');
const submitBtnElement = document.querySelector('form button');
const formLabelElement = document.querySelector('form h3');
const titleElement = document.getElementsByName('title')[0];
const authorElement = document.getElementsByName('author')[0];

loadBooksBtnElement.addEventListener('click', loadBooksHandler);
submitBtnElement.addEventListener('click', submitBtnHandler);
let id = '';

async function loadBooksHandler() {
    tableElement.innerHTML = '';
    const response = await fetch(url);
    const data = await response.json();
    Object.values(data).forEach(book => {
        createRow(book.title, book.author, book._id);
    });
};

async function submitBtnHandler(e) {
    e.preventDefault();
    if (titleElement.value != '' && authorElement.value != '') {
        if (submitBtnElement.textContent == 'Submit') {
            let data = {
                author: authorElement.value,
                title: titleElement.value
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json', },
                body: JSON.stringify(data)
            });
            //createRow(titleElement.value, authorElement.value);
            loadBooksBtnElement.click();
        } else {
            let newUrl = `${url}/${id}`;
            let data = {
                author: authorElement.value,
                title: titleElement.value,
                _id: id
            };
            const response = await fetch(newUrl, {
                method: 'PUT',
                headers: { 'content-type': 'application/json', },
                body: JSON.stringify(data)
            });
            formLabelElement.textContent = 'FORM';
            submitBtnElement.textContent = 'Submit';
            loadBooksBtnElement.click();
        };
        authorElement.value = '';
        titleElement.value = '';
    }
};



async function editBtnHandler(e) {
    formLabelElement.textContent = 'Edit FORM';
    submitBtnElement.textContent = 'Save';
    const currentElement = e.target.parentNode.parentNode;
    authorElement.value = currentElement.children[1].textContent;
    titleElement.value = currentElement.children[0].textContent;
    id = e.target.id;
};

async function deleteBtnHandler(e) {
    id = e.target.id;
    const currentElement = e.target.parentNode.parentNode;
    tableElement.removeChild(currentElement);
    const deleteResponse = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
};

function createRow(title, author, id) {
    const tr = document.createElement('tr');
    const titleCell = tr.insertCell();
    titleCell.innerText = title;
    const authorCell = tr.insertCell();
    authorCell.innerText = author;
    const actionCell = tr.insertCell();
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.setAttribute('id', id);
    actionCell.appendChild(editBtn);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('id', id);
    actionCell.appendChild(deleteBtn);
    editBtn.addEventListener('click', editBtnHandler);
    deleteBtn.addEventListener('click', deleteBtnHandler);
    tableElement.appendChild(tr);
};