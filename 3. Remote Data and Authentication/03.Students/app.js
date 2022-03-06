
async function solve() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    const tableElement = document.querySelector('#results tbody');
    const submitBtn = document.getElementById('submit');

    const response = await fetch(url);
    const data = await response.json();

    Object.values(data).forEach(st => {
        createRow(st.firstName, st.lastName, st.facultyNumber, Number(st.grade));
    });

    submitBtn.addEventListener('click', submitBtnHandler);

    async function submitBtnHandler(e) {
        e.preventDefault();
        const firstNameInput = document.getElementsByName('firstName')[0];
        const lastNameInput = document.getElementsByName('lastName')[0];
        const facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        const gradeInput = document.getElementsByName('grade')[0];

        if (firstNameInput.value != '' && lastNameInput != '' && facultyNumberInput.value != ''
            && gradeInput.value != '' && !isNaN(gradeInput.value)) {
            let data = {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: Number(facultyNumberInput.value),
                grade: Number(gradeInput.value),
            };
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json', },
                body: JSON.stringify(data)
            });

            createRow(firstNameInput.value, lastNameInput.value, facultyNumberInput.value, Number(gradeInput.value));

            firstNameInput.value = '';
            lastNameInput.value = '';
            facultyNumberInput.value = '';
            gradeInput.value = '';
        } else {
            alert('Wrong "Grade" format or blank fields');
        }
    }

    function createRow(firstName, lastName, facultyNumber, grade){
        const tr = document.createElement('tr');
        const firstNameCell = tr.insertCell();
        firstNameCell.innerText = firstName;
        const lastNameCell = tr.insertCell();
        lastNameCell.innerText = lastName;
        const facultyNumberCell = tr.insertCell();
        facultyNumberCell.innerText = facultyNumber;
        const gradeCell = tr.insertCell();
        gradeCell.innerText = grade;
        tableElement.appendChild(tr);
    }
}

solve();