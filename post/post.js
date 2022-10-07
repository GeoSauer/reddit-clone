import '../auth/user.js';

import { getPost, createComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postContent = document.getElementById('post-content');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');
const addCommentButton = addCommentForm.querySelector('button');

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
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addCommentButton.disabled = true;

    const formData = new FormData(addCommentForm);
    const commentInsert = {
        post_id: post.id,
        text: formData.get('text'),
    };
    const response = await createComment(commentInsert);
    error = response.error;
    const comment = response.data;
    addCommentButton.disabled = false;

    if (error) {
        displayError();
    } else {
        post.commentses.unshift(comment);
        displayComments();

        addCommentForm.reset();
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
    postContent.textContent = post.content;
    postImage.src = post.image_url;
    postImage.alt = `${post.title} image`;
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of post.commentses) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}
