import { BadRequestException, CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements NestInterceptor {
 intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if(request.session && request.session.userId) {
      return next.handle();
    }

    throw new BadRequestException(HttpStatus.UNAUTHORIZED, 'Unauthorized request');
 }
}