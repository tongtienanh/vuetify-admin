export interface payloadGame {

  gameId?: number | null;
  name: string,
  images: any,
  description: string,
  content: string,
  tags: number[]
  links: linkDownload[],
  categories: number[],

}
interface linkDownload {
  type: number,
  url: string
}
export interface payloadImage {
  file: FormData
}

export interface gameParams {
  search?: string,
  tags?: number[],
  categories?: number[],
  page?: number;
  size?: number;
}
export interface deleteParam {
  ids: number[];
}
