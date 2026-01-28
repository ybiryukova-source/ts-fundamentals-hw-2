import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./pixabay-api";
import { initRender } from "./render-functions";
import Pagination from "./pagination";
import type { PixabayResponse } from "./types/pixabay";

const pagination = new Pagination();
let query: string = "";

const searchForm = document.querySelector<HTMLFormElement>(".form");
const loadMoreButton = document.querySelector<HTMLButtonElement>(".load-more");
const gallery = document.querySelector<HTMLUListElement>(".gallery");
const loader = document.querySelector<HTMLElement>(".loader");

if (!searchForm) throw new Error("Missing .form element");
if (!loadMoreButton) throw new Error("Missing .load-more element");
if (!gallery) throw new Error("Missing .gallery element");
if (!loader) throw new Error("Missing .loader element");

const ui = initRender({ 
  gallery, 
  loader, 
  loadMoreBtn: loadMoreButton 
});

searchForm.addEventListener("submit", onFormSubmit);
loadMoreButton.addEventListener("click", onLoadMoreClick);

async function onFormSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();

  const formElement = event.currentTarget as HTMLFormElement;
  const inputElement = formElement.querySelector<HTMLInputElement>('input[name="search-text"]');
  
  if (!inputElement) return;

  const queryValue = inputElement.value.trim();
  query = queryValue;

  if (query === "") {
    iziToast.warning({
      message: "Please enter a search query.",
      position: "topRight"
    });
    return;
  }

  pagination.reset();
  ui.clear();
  ui.hideLoadMore();
  ui.showLoader();

  await fetchAndRender();
  formElement.reset();
}

async function onLoadMoreClick(): Promise<void> {
  pagination.next();
  await fetchAndRender();
}

async function fetchAndRender(): Promise<void> {
  const isInitial = pagination.current === 1;

  try {
    ui.showLoader();
    ui.hideLoadMore();

    const data: PixabayResponse = await getImagesByQuery(query, pagination.current);

    if (isInitial && data.hits.length === 0) {
      iziToast.error({
        message: "There are no images matching your search query. Try again!",
        position: "topRight"
      });
      return;
    }

    ui.renderGallery(data.hits);

    const isEndOfResults = pagination.isEnd(data.totalHits);
    
    if (isEndOfResults) {
      ui.hideLoadMore();
      if (!isInitial) {
         iziToast.info({ message: "You've reached the end of search results." });
      }
      return;
    }

    ui.showLoadMore();

  } catch (error) {
    console.error(error);
    iziToast.error({ message: "An error occurred while fetching images. Try again." });
  } finally {
    ui.hideLoader();
  }
}