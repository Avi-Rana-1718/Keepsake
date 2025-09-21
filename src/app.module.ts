import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { AlbumsModule } from './modules/albums/albums.module';
import { MediaModule } from './modules/media/media.module';
import { MediaEntity } from './entities/media.entity';
import { AlbumsEntity } from './entities/albums.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'neondb',
      entities: [UserEntity, MediaEntity, AlbumsEntity],
      ssl: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,  '../files'), // folder to serve static files from
      serveRoot: '/static', // serve files under '/static' path
    }),
    AuthModule,
    AlbumsModule,
    MediaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
