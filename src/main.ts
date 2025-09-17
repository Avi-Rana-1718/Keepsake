import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ credentials: true, origin: "http://localhost:5173" });

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // secure cookies only in prod
        sameSite: "lax", // or 'none' if cross-site with secure:true
      },
    }),
  );

  console.log(join(__dirname,  '../files'));
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
