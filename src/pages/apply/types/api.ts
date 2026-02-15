export type ApiSuccess<T> = {
  success: true;
  code: string;
  message: string;
  data: T;
};

export type ApiFailure = {
  success: false;
  code: string;
  message: string;
  data: null;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
