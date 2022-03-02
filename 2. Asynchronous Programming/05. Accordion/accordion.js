async function solution() {
    const mainElement = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const res = await fetch(url);
    const data = await res.json();
    data.forEach(ar => {
        const divAccordion = createElement('div', '', ['class', 'accordion']);
        const divHead = createElement('div', '', ['class', 'head']);
        const span = createElement('span', ar.title);
        const button = createElement('button', 'More', ['class', 'button', 'id', ar._id]);
        const divExtra = createElement('div', '', ['class', 'extra']);
        const p = createElement('p');

        button.addEventListener('click', toggle);

        divHead.appendChild(span);
        divHead.appendChild(button);
        divExtra.appendChild(p);
        divAccordion.appendChild(divHead);
        divAccordion.appendChild(divExtra);
        mainElement.appendChild(divAccordion);
    });

    async function toggle(e) {
        const accordion = e.target.parentNode.parentNode;
        const p = accordion.children[1].children[0];
        const extra = accordion.children[1];
        const id = e.target.id;
        console.log(id);
        
        const newUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;
        const res = await fetch(newUrl);
        const data = await res.json();
        
        p.textContent = data.content;
        
        const hidden = e.target.textContent === 'More';
        extra.style.display = hidden ? 'block' : 'none';
        e.target.textContent = hidden ? 'Less' : 'More';

    };

    function createElement(type, content, attributes = []) {
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

solution();