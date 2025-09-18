import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaTypes } from 'src/common/enums/MediaTypes.enums';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { MediaEntity } from 'src/entities/media.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

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
      item.url = `${process.env.BASE_URL}static${item.url}`;
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
    const data: MediaEntity[] = await this.mediaRepository.findBy({userId});

    if (!data) {
      throw new BadRequestException('No media found');
    }

    for(let item of data) {
      item.url = `${process.env.BASE_URL}static${item.url}`;
      console.log(item.url);
      
    }

    return {
      statusCode: HttpStatus.OK,
      message: data,
    };
  }

   async getMediaById(mediaId: string, userId: string): Promise<ResponseInterface> {
    const data: MediaEntity|null = await this.mediaRepository.findOneBy({id: mediaId, userId: userId});

    console.log(data, userId, mediaId);
    
    if (!data) {
      throw new BadRequestException('No media found');
    }
    data.url = `${process.env.BASE_URL}static${data.url}`;
    return {
      statusCode: HttpStatus.OK,
      message: data,
    };
  }
}
