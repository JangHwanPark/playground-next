import { BaseError } from '@/shared/errors/error-base';

export class ValidationError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}
