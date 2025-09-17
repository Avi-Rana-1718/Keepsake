import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaTypes } from 'src/common/enums/MediaTypes.enums';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { MediaEntity } from 'src/entities/media.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
  ) {}

  async getAllMediaAlbum(
    albumId: string|undefined,
    userId: string,
  ): Promise<ResponseInterface> {

    
    if(!albumId) {
      albumId = 'default';
    }

    const data = await this.mediaRepository.findBy({ albumId, userId });

    for(let item of data) {
      item.url = `http://localhost:3000/static${item.url}`;
      console.log(item.url);
      
    }
    if (!data) {
      throw new BadRequestException('No media found');
    }

    return {
      statusCode: HttpStatus.OK,
      message: data,
    };
  }

  async uploadImages(
    files: Express.Multer.File[],
    albumId: string | null,
    userId: string,
  ): Promise<ResponseInterface> {

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    

    const mediaEntities: MediaEntity[] = files.map((file) => {
      const media: MediaEntity = {
        albumId: albumId || 'default',
        userId,
        size: file.size,
        url: `/${userId}/${file.filename}`,
        type: MediaTypes.IMAGE
      };
      return media;
    });

    await this.mediaRepository.save(mediaEntities);

    return {
      statusCode: HttpStatus.OK,
      message: 'Images uploaded successfully',
    };
  }

  async getAllUserMedia(userId: string): Promise<ResponseInterface> {
    const data: MediaEntity[] = await this.mediaRepository.manager.query(
      `SELECT * FROM media WHERE media.userId = $1 and media.is_active is true ORDER BY media.created_at DESC LIMIT 10`,
      [userId],
    );

    if (!data) {
      throw new BadRequestException('No media found');
    }

    for(let item of data) {
      item.url = `http://localhost:3000/static${item.url}`;
      console.log(item.url);
      
    }

    return {
      statusCode: HttpStatus.OK,
      message: data,
    };
  }
}
