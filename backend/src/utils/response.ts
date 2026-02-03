import { IApiResponse } from "../types/index";

export const successResponse = <T>(
  message: string = "Success",
  data?: T,
  code: number = 200,
): IApiResponse<T> => ({
  success: true,
  message,
  data,
  code,
});

export const errorResponse = (
  message: string = "Error",
  error: string | null = null,
  code: number = 500,
): IApiResponse => ({
  success: false,
  message,
  error: error || undefined,
  code,
});
