import { ValidationError } from '@/shared/errors/error-validation';
import { ApiError } from '@/shared/errors/error-api';


export function handleError(error: Error) {
    console.error(error);

    if (error instanceof ValidationError) {
        alert(error.message);
        return;
    }

    if (error instanceof ApiError) {
        alert(error.message);
        return;
    }

    alert("예상치 못한 오류가 발생했습니다");
}
