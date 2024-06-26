'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImg } from './js/pixabay-api.js';
import { createGallery } from './js/render-functions.js';

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});
const searchForm = document.querySelector('.form-search-img');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const listResults = document.querySelector('.list-results');

function formHandler(event) {
  event.preventDefault();

  if (!input.value.trim()) {
    return iziToast.warning({
      message: 'The field cannot be empty!',
      position: 'topRight',
    });
  }

  loader.classList.toggle('is-hidden');
  listResults.innerHTML = '';

    fetchImg(input.value.trim())
      .then(data => {
        event.target.reset();

        if (data.hits.length === 0) {
          iziToast.info({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }

        createGallery(data.hits);

        lightbox.refresh();
      })
      .catch(error => console.log(error))
      .finally(() => {
        loader.classList.toggle('is-hidden');
      });
}

searchForm.addEventListener('submit', formHandler);