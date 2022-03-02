async function lockedProfile() {
    const mainElement = document.getElementById('main');
    mainElement.removeChild(mainElement.children[0]);
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const res = await fetch(url);
    const data = await res.json();

    for (const key in data) {
        let { age, email, username, _id } = data[key];
        const profileDiv = elementFactory('div', '', ['class', 'profile']);
        const image = elementFactory('img', '', ['src', './iconProfile2.png', 'class', 'userIcon']);
        const lockLabel = elementFactory('label', 'Lock');
        const lockRadioInput = elementFactory('input', '', ['type', 'radio', 'name', `${username}Locked`, 'value', 'lock', 'checked', '']);
        const unlockLabel = elementFactory('label', 'Unlock');
        const unlockRadioInput = elementFactory('input', '', ['type', 'radio', 'name', `${username}Locked`, 'value', 'unlock']);
        const br = document.createElement('br');
        const hr = document.createElement('hr');
        const usernameLabel = elementFactory('label', 'Username');
        const usernameInput = elementFactory('input', '', ['type', 'text', 'name', `${username}Username`, 'value', username, 'disabled', true, 'readonly', true]);
        const userDiv = elementFactory('div', '', ['id', `${username}HiddenInfo`]);
        const hr2 = document.createElement('hr');
        const emailLabel = elementFactory('label', 'Email:');
        const emailInput = elementFactory('input', '', ['type', 'email', 'name', `${username}Email`, 'value', email, 'disabled', true, 'readonly', true]);
        const ageLabel = elementFactory('label', 'Age:');
        const ageInput = elementFactory('input', '', ['type', 'email', 'name', `${username}Age`, 'value', age, 'disabled', true, 'readonly', true]);
        const shouMoreBtn = elementFactory('button', 'Show more');


        profileDiv.appendChild(image);
        profileDiv.appendChild(lockLabel);
        profileDiv.appendChild(lockRadioInput);
        profileDiv.appendChild(unlockLabel);
        profileDiv.appendChild(unlockRadioInput);
        profileDiv.appendChild(br);
        profileDiv.appendChild(hr);
        profileDiv.appendChild(usernameLabel);
        profileDiv.appendChild(usernameInput);
        userDiv.appendChild(hr2);
        userDiv.appendChild(emailLabel);
        userDiv.appendChild(emailInput);
        userDiv.appendChild(ageLabel);
        userDiv.appendChild(ageInput);
        //profileDiv.appendChild(userDiv);

        profileDiv.appendChild(shouMoreBtn);
        mainElement.appendChild(profileDiv);
        //shouMoreBtn.addEventListener('click', shouMoreBtnClickHandler);
        shouMoreBtn.addEventListener('click', (e)=>{
            const currentProfile = e.target.parentNode;
            let isLocked = currentProfile.querySelector('input').checked;
            if (!isLocked) {
                if (e.target.textContent == 'Show more') {
                    profileDiv.appendChild(userDiv);
                    e.target.textContent = 'Hide it';
                } else {
                    profileDiv.removeChild(userDiv);
                    e.target.textContent = 'Show more';
                };

            }
        });
    };




    function elementFactory(type, content, attributes = []) {
        const element = document.createElement(type);
        if (content) {
            element.textContent = content;
        }
        if (attributes.length > 0) {
            for (let i = 0; i < attributes.length; i += 2) {
                element.setAttribute(attributes[i], attributes[i + 1]);
            }
        }
        return element;
    }
}