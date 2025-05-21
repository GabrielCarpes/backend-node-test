import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Docs } from "@shared/docs";
import { LoggerInterceptor } from "@shared/interceptor/logger.interceptor";
import { formatValidationError } from "@shared/utils/format-validation-error";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await Docs.initialize(app);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: any) => {
        return formatValidationError(errors);
      },
      stopAtFirstError: true,
    })
  );

  app.useGlobalInterceptors(new LoggerInterceptor());
  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX || "v1");

  const port = process.env.API_PORT || 3333;
  await app.listen(port);
}
bootstrap();
