import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  app.set('trust proxy', 1);
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true, // secure cookies only in prod
        sameSite: 'none', // or 'none' if cross-site with secure:true
      },
    }),
  );
  app.useGlobalFilters(new ExceptionInterceptor)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
