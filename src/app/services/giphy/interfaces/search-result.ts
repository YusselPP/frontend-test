export interface SearchResult {
  data: Gif[];
  pagination: Pagination;
}

export interface Gif {
  url: string;
  title: string;
  images: Images;
}

export interface Images {
  fixed_height: Image;
  fixed_width: Image;
  original: Image;
  preview_gif: Image;
}

export interface Image {
  url: string;
  width: string;
  height: string;
}

export interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}
