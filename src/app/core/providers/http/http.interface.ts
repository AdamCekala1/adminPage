export interface HttpResponse<T> {
  body: T;
  errors?: any;
  isSuccess: boolean;
  statusCode: number;
}
