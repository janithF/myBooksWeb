export type ImageType = "url" | "fileUpload";

export interface Book {
  id: string;
  imageType: ImageType;
  image: string;
  title: string;
  author: string;
  rating: number;
}
