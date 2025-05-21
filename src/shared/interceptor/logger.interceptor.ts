import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import pino from "pino";
import { Observable, tap } from "rxjs";

const logger = pino({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
});

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const user = request.user;

    const dataForlogs = {
      method,
      url,
      body: request.body,
      user: {
        id: user?.sub ?? "",
        apiKey: user?.apiKey ?? "",
      },
    };

    return next.handle().pipe(
      tap({
        next: () => {},
        error: (error) => {
          logger.error(error, dataForlogs);
        },
      })
    );
  }
}
