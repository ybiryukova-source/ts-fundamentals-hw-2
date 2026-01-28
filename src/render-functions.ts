import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import type { PixabayImage } from "./types/pixabay";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

type RenderAPI = {};

type RenderElements = {};

export function initRender(elements: RenderElements): RenderAPI {
  const { gallery, loader, loadMoreButton } = elements;

  // initial UI state
  loader.style.display = "none";
  loadMoreButton.style.display = "none";

  const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
  });

  const createGallery = (images) => {
    const galleryItems = images
      .map(
        (image) => `
          <a href="${image.largeImageURL}">
            <img
              src="${image.webformatURL}"
              alt="${image.tags}"
              title="${image.tags}"
              width="100"
              height="100"
              loading="lazy"
            />
          </a>`
      )
      .join("");

    gallery.insertAdjacentHTML("beforeend", galleryItems);
    lightbox.refresh();
  };

  const clearGallery = () => {
    gallery.innerHTML = "";
  };

  const showLoader = () => {
    loader.style.display = "block";
  };

  const hideLoader = () => {
    loader.style.display = "none";
  };

  const showLoadMoreButton = () => {
    loadMoreButton.style.display = "block";
  };

  const hideLoadMoreButton = () => {
    loadMoreButton.style.display = "none";
  };

  const showToast = (text: string) => {
    iziToast.info({ message: text, position: "topRight" });
  };

  return {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    showToast,
  };
}
