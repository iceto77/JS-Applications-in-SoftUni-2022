function attachEvents() {
    //const authorElement = document.querySelector('#controls input');
    const authorElement = document.getElementById('controls').children[1];
    const contentElement = document.getElementById('controls').children[4];
    const sendBtnElement = document.getElementById('submit');
    const refreshBtnElement = document.getElementById('refresh');
    const textAreaElement = document.getElementById('messages');
    const url = 'http://localhost:3030/jsonstore/messenger';

    sendBtnElement.addEventListener('click', sendBthHandler);
    refreshBtnElement.addEventListener('click', refreshBthHandler);

    async function sendBthHandler(e) {

        if (authorElement.value != '' && contentElement.value != '') {
            await request(url, { author: authorElement.value, content: contentElement.value });
            authorElement.value = '';
            contentElement.value = '';
        }


        //e.preventDefault();
        // let author = '';
        // console.log(authorElement);
        // let content = '';
        // let data = {
        //     author,
        //     content,
        // }

        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         location.href = '/';
        //     })
    }

    async function refreshBthHandler(e) {
        const res = await fetch(url);
        const data = await res.json();
        let allMassages = Object.values(data);
        textAreaElement.value = allMassages.map(({ author, content }) => `${author}: ${content}`).join('\n');
    }

    async function request(url, options) {
        if (options) {
            options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(options)
            };
        } else {

        }
        const response = await fetch(url, options);
        return response.json();
    }
}

attachEvents();