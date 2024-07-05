export default class ServiceError extends Error {
    constructor(public readonly cause?: Error, message?: string) {
        super(message);
    }
}
