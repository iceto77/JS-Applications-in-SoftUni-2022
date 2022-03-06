function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const person = document.getElementById('person');
    const phone = document.getElementById('phone');

    loadBtn.addEventListener('click', loadBtnHahdler);
    createBtn.addEventListener('click', createBtnHahdler);

    async function loadBtnHahdler() {
        ul.innerHTML = '';
        const res = await fetch(url);
        const data = await res.json();

        Object.values(data).forEach(x => {
            const { person, phone, _id } = x;
            const li = elementFactory('li', `${person} : ${phone}`, ul);
            li.setAttribute('id', _id);

            const deleteBtn = elementFactory('button', 'Delete', li);
            deleteBtn.setAttribute('id', 'bntDelete');
            deleteBtn.addEventListener('click', deleteBtnHandler);
        });
    }

    async function createBtnHahdler() {
        if (person.value != '' && phone.value != '') {
            const data = {
                person: person.value,
                phone: phone.value,
            }
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json', },
                body: JSON.stringify(data)
            });
            person.value = '';
            phone.value = '';
            loadBtn.click();
        }
    }

    async function deleteBtnHandler(e) {
        const id = e.target.parentNode .id;
        console.log(id);
        e.target.parentNode.remove();
        const deleteResponse = await fetch(`${url}/${id}`, {
            method: 'DELETE',
        });
    }

    function elementFactory(type, content, appender) {
        const newElement = document.createElement(type);
        newElement.textContent = content;
        appender.appendChild(newElement);
        return newElement;
    }

}

attachEvents();