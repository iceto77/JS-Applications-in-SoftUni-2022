function attachEvents() {
    const loadPostBtnElement = document.getElementById('btnLoadPosts');
    const wiewPostBtnElement = document.getElementById('btnViewPost');
    const selectPostElement = document.getElementById('posts');
    const postTitleElement = document.getElementById('post-title');
    const postBodyElement = document.getElementById('post-body');
    const postCommentsElement = document.getElementById('post-comments');

    loadPostBtnElement.addEventListener('click', loadPostBtnClickHandler);

    async function loadPostBtnClickHandler(e) {
        selectPostElement.innerHTML = '';
        const url = 'http://localhost:3030/jsonstore/blog/posts';
        const res = await fetch(url);
        const posts = await res.json();
        for (const key in posts) {
            let title = posts[key].title;
            const newOption = document.createElement('option');
            newOption.setAttribute('value', key);
            newOption.textContent = title;
            selectPostElement.appendChild(newOption);
        }
        wiewPostBtnElement.addEventListener('click', wiewPostBtnClickHandler);
    }

    async function wiewPostBtnClickHandler(e) {
        let targetPostId = selectPostElement.value;
        const urlPost = `http://localhost:3030/jsonstore/blog/posts/${targetPostId}`;
        const resPost = await fetch(urlPost);
        const post = await resPost.json();
        const urlComments = 'http://localhost:3030/jsonstore/blog/comments';
        const resComments = await fetch(urlComments);
        const comments = await resComments.json();
        postCommentsElement.innerHTML = '';
        let { title, id, body } = post;
        postTitleElement.textContent = title;
        postBodyElement.textContent = body;
        for (const key in comments) {
            let { text, postId, id } = comments[key];
            if (postId == targetPostId) {
                const newLi = document.createElement('li');
                newLi.setAttribute('id', id);
                newLi.textContent = text;
                postCommentsElement.appendChild(newLi);
            }
        }
    }
}

attachEvents();