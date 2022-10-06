import '../auth/user.js';

import { createPost, uploadImage } from '../fetch-utils.js';

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = postForm.querySelector('button');

let error = null;

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/placeholder.jpeg';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `posts/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('images', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        image_url: url,
        content: formData.get('content'),
    };

    const response = await createPost(post);
    error = response.error;
    addButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
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
