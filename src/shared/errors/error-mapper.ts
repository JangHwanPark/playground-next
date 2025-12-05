import { ValidationError } from '@/shared/errors/error-validation';
import { ApiError } from '@/shared/errors/error-api';


export function axiosErrorMapper(error: any) {
  const status = error?.response?.status;
  const message = error?.response?.data?.message;

  if (status === 400) return new ValidationError(message || '잘못된 요청입니다');
  if (status >= 500) return new ApiError('서버 오류가 발생했습니다', status);

  return new ApiError(message || '알 수 없는 오류가 발생했습니다', status);
}

export async function fetchErrorMapper(error: any) {
  if (error instanceof TypeError) {
    return new ApiError('네트워크 오류가 발생했습니다');
  }

  if (error instanceof Response) {
    const status = error.status;
    let message = '요청 중 문제가 발생했습니다';

    try {
      const data = await error.json();
      message = data?.message ?? message;
    } catch (_) {}

    if (status === 400) return new ValidationError(message);
    if (status >= 500) return new ApiError('서버 오류가 발생했습니다', status);

    return new ApiError(message, status);
  }

  return new ApiError('알 수 없는 오류가 발생했습니다');
}
