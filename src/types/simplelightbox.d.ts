declare module "simplelightbox" {
  export interface SimpleLightboxOptions {
    captions?: boolean;
    captionsData?: "alt" | "title" | "data-title";
    captionDelay?: number;
    captionPosition?: "bottom" | "top";
    animationSpeed?: number;
    fadeSpeed?: number;
    overlayOpacity?: number;
    loop?: boolean;
    nav?: boolean;
    close?: boolean;
    docClose?: boolean;
    disableScroll?: boolean;
    uniqueImages?: boolean;
  }

  export default class SimpleLightbox {
    constructor(selector: string, options?: SimpleLightboxOptions);

    refresh(): void;
    open(position?: number): void;
    next(): void;
    prev(): void;
    destroy(): void;

    on(event: string, callback: () => void): void;
    off(event: string, callback: () => void): void;
  }
}