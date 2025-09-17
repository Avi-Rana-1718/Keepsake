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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-aged-poetry-a1u3in5o-pooler.ap-southeast-1.aws.neon.tech',
      username: 'neondb_owner',
      password: 'npg_VuLXZEw54MPJ',
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
