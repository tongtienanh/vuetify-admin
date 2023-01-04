export interface payloadGame {
  name: string,
  image: string,
  description: string,
  content: string,
  tags: number[]
  links: linkDownload[],

}
interface linkDownload {
  type: number,
  url: string
}
export interface payloadImage {
  file: FormData
}
