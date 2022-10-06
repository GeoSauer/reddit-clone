import '../auth/user.js';

import { getPost } from '../fetch-utils.js';

const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postContent = document.getElementById('post-content');

let error = null;
let post = null;

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.assign('/');
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        displayError();
    }
    if (!post) {
        location.assign('/');
    } else {
        displayPost();
    }
});

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPost() {
    postTitle.textContent = post.title;
    postImage.src = post.image_url;
    postImage.alt = `${post.title} image`;
    postContent.textContent = post.content;
}
