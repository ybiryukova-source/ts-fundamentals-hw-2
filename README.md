# Guide

If you want to run a quick check locally, set `VITE_PIXABAY_API_KEY` (either in a `.env` file or your environment) before running the dev server.

## HTML expectations

- Search form: `.form` with input name `search-text`.
- Gallery container: `.gallery` (an `<ul>` in the provided template). Gallery markup must use anchors `<a href="largeImageURL">` so SimpleLightbox binds to `.gallery a`.
- Load more button: `.load-more` (initially hidden).
- Loader element: `.loader` (manipulated by `showLoader`/`hideLoader`).

## Implementation overview

### `src/main.ts`

App orchestration. Contains DOM wiring, event handlers for the search form (`.form`) and the load-more button (`.load-more`), and the `fetchAndRender` style helper that coordinates API + UI updates.

### `src/pixabay-api.ts`

HTTP layer. Exports `getImagesByQuery(query, page)` which calls Pixabay using typed `axios.get<PixabayResponse>(...)` and returns the `response.data` shaped as `PixabayResponse`.

### `src/render-functions.ts`

Presentation helpers. This file exposes `initRender` which accepts element instances and returns UI functions: `createGallery`, `clearGallery`, `showLoader`/`hideLoader`, `showLoadMoreButton`/`hideLoadMoreButton`, and `showToast`. The module instantiates `SimpleLightbox` and calls `lightbox.refresh()` after DOM updates.

### `src/pagination.ts`

Encapsulates pagination state. Defines `Pagination` and exports `PER_PAGE` (default 15). Use this class to advance/reset page state and compute end-of-results.

### `src/types/`

Type definitions. `types/pixabay.ts` contains `PixabayImage` and `PixabayResponse` used by the API layer; `types/simplelightbox.d.ts` contains minimal typings for SimpleLightbox.

## Notable implementation decisions

- Dependency injection for rendering: `render-functions.ts` does not query the DOM at module load. Instead, `initRender({ gallery, loader, loadMoreButton })` is called from `main.ts` and returns bound UI functions. This improves testability and avoids module-level side effects.
- Pagination encapsulation: `src/pagination.ts` centralizes the page counter and `PER_PAGE` constant. The `Pagination` class provides `reset()`, `next()`, `current` and `isEnd(totalHits)` helpers.
- Consolidated network + render flow: `main.ts` uses a single `fetchAndRender()` function for both initial search and load-more flows, deriving initial vs subsequent calls from the pagination state.

## Grading checklist (suggested)

- **Functionality**: Search returns images, gallery displays items, lightbox opens large images, load-more works, loader/toasts behave correctly.
- **Types**: `axios.get` is typed as `axios.get<PixabayResponse>(...)`; types in `src/types` match usage.
- **Code structure**: Clear separation between API, rendering, and orchestration.
- **Edge cases**: Empty query handling, zero-results handling, end-of-results behavior, and error handling for failed requests.
