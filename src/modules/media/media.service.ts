import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaTypes } from 'src/common/enums/MediaTypes.enums';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { MediaEntity } from 'src/entities/media.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { AlbumsEntity } from 'src/entities/albums.entity';
import * as uuid from 'uuid'
dotenv.config();

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private mediaRepository: Repository<MediaEntity>,
    @InjectRepository(AlbumsEntity)
    private albumsRepository: Repository<AlbumsEntity>,
  ) {}

  async getAllMediaAlbum(
    albumId: string|undefined,
    userId: string,
  ): Promise<ResponseInterface> {

    const album: AlbumsEntity | null = await this.albumsRepository.findOneBy({id: albumId, userId: userId});

    if(!album) {
      throw new BadRequestException('Album not found');
    }

    return {
      statusCode: HttpStatus.OK,
      message: album.content || [],
    };
  }

  async uploadImages(
    files: Express.Multer.File[],
    albumId: string,
    userId: string,
  ): Promise<ResponseInterface> {

    const album: AlbumsEntity | null = await this.albumsRepository.findOneBy({id: albumId, userId: userId});

    if(!album) {
      throw new BadRequestException('Album not found');
    }

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    
    const mediaEntities: MediaEntity[] = files.map((file) => {
      const media: MediaEntity = {
        id: uuid.v4(),
        userId,
        size: file.size,
        url: `/${userId}/${file.filename}`,
        type: MediaTypes.IMAGE
      };
      return media;
    });

    await this.albumsRepository.update(albumId, {
      content: [...(album.content || []), ...mediaEntities.map(el=>el.id)]
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
