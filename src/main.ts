import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ credentials: true, origin: '*' });

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

  console.log(join(__dirname, '../files'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
