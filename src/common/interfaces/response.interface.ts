export interface ResponseInterface {
    statusCode: number,
    message: string | any;
    error?: string | any[];
}