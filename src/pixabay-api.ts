import axios from "axios";
import type { PixabayResponse } from "./types/pixabay";
import { PER_PAGE } from "./pagination";

export const getImagesByQuery = async (query, page) => {
  const response = await axios.get(`https://pixabay.com/api/`, {
    params: {
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      key: import.meta.env.VITE_PIXABAY_API_KEY,
    },
  });
  return response.data;
};
