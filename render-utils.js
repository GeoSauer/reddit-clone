export function renderPost(post) {
    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const img = document.createElement('img');
    img.src = post.image_url;

    const p = document.createElement('p');
    p.textContent = post.content;

    li.append(h2, img, p);

    return li;
}
