import { Module, UseInterceptors } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from 'src/entities/media.entity';
import path from 'path';
import * as fs from 'fs';

@Module({
  imports: [
   MulterModule.register({
  storage: diskStorage({
    destination: (req: any, file, cb) => {
      const userId = req.session.userId;
      const uploadPath = path.join(__dirname, '../../../files', userId);

      // Ensure directories exist
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      cb(null, filename);
    },
  }),
}),
    TypeOrmModule.forFeature([MediaEntity]),
  ],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
