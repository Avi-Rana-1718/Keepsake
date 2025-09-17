import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' });

  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: process.env.NODE_ENV == "prod", // secure cookies only in prod
        sameSite: "lax", // or 'none' if cross-site with secure:true
      },
    }),
  );

  console.log(join(__dirname,  '../files'));
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
