export type ImageType = "url" | "fileUpload";

export interface Book {
  id: number;
  imageType: ImageType;
  image: string;
  title: string;
  author: string;
  rating: number;
}
