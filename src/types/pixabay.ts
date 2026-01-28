export interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
  likes: number;
  views: number;
  comments: number;
  downloads: number;
}

export interface PixabayResponse {
  totalHits: number;
  hits: PixabayImage[];
}
