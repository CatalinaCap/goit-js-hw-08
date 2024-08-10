import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const gallery = document.querySelector('.gallery');
galleryItems.forEach(e => {
  const { preview, original, description } = e;
  const img = `<li class='gallery__item'>
          <a class='gallery__link' href='${original}'>
              <img src='${preview}' alt='${description}' class='gallery__image' data-source='${original}' title='${description}'>
          </a>
      </li>`;
  gallery.insertAdjacentHTML('beforeend', img);
});

gallery.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  let gallery = new SimpleLightbox('.gallery a');
  gallery.on('closed.simplelightbox', () => {
    gallery.refresh();
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
lightbox.on("show.simplelightbox", function () {
  setTimeout(applyImageStyles, 100);
});
lightbox.on("change.simplelightbox", function () {
  applyImageStyles();
});