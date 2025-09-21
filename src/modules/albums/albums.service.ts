import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseInterface } from 'src/common/interfaces/response.interface';
import { AlbumsEntity } from 'src/entities/albums.entity';
import { CreateAlbumDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from "uuid"

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumsEntity)
    private albumsRepository: Repository<AlbumsEntity>,
  ) {}

  async getAlbumsForUser(userId: string): Promise<ResponseInterface> {
    const albums: AlbumsEntity[] | null = await this.albumsRepository.findBy({
      userId,
    });

    if (!albums) {
      throw new BadRequestException('No albums found');
    }
    return {
      statusCode: HttpStatus.OK,
      message: albums.map((el) => ({
        name: el.albumName,
        id: el.id,
        createdAt: el.created_at,
        modifiedAt: el.updated_at,
        mediaCount: el?.metadata?.totalMedia || 0,
      })),
    };
  }

  async createAlbum(
    createAlbumDto: CreateAlbumDto,
    userId: string,
  ): Promise<ResponseInterface> {
    const { albumName } = createAlbumDto;
    const album: AlbumsEntity = {
      id: uuid.v4(),
      albumName: albumName,
      userId: userId,
      content: []
    };
    await this.albumsRepository.save(album);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created album!',
    };
  }

  async addMediaToAlbum(albumId: string, media: any): Promise<ResponseInterface> {
    const album: AlbumsEntity | null = await this.albumsRepository.findOneBy({id: albumId});
    if (!album) {
      throw new BadRequestException('Album not found');
    }
    album.content = [...album.content, ...media]
    album.content = album.content.filter((item, index) => album.content.indexOf(item) === index);

    await this.albumsRepository.save(album);
    return {
      statusCode: HttpStatus.OK,
      message: 'Media added to album!',
    };
  }
}
