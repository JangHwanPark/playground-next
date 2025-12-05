import { BaseError } from '@/shared/errors/error-base';

export class ApiError extends BaseError {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
    }
}
