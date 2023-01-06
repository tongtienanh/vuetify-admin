export class ResponseEntity<T> {
  success = true;
  code = 200;
  data: any = [];
  pagination?: PaginationInterface;
  message: any = '';

  constructor(data?: T, message?: string, pagination?: PaginationInterface) {
    this.data = data;
    this.message = message;
    this.pagination = pagination;
  }
  ok(data: T, message?: string, pagination?: PaginationInterface) {
    this.data = data;
    this.pagination = pagination;
    this.message = message;

    return this;
  }
}
export interface resource {
  success: boolean,
  code: number | string,
  data: any,
  message: boolean,
  pagination: PaginationInterface
}
export interface PaginationInterface {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  page: number;
  size: number;
}
